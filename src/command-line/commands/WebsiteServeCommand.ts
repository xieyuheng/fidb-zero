import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import * as ReverseProxyClient from "../../reverse-proxy-client"
import { createRequestListener } from "../../server/createRequestListener"
import { maybeTlsOptionsFromArgv } from "../../server/createServer"
import { startServer } from "../../server/startServer"
import { changeLogger, log } from "../../utils/log"
import { handle } from "../../website-server"
import { createContext } from "../../website-server/Context"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "rewrite-not-found-to"?: string
  cors?: boolean
  "tls-cert"?: string
  "tls-key"?: string
  "public-url"?: string
  logger?: string
}

export class WebsiteServeCommand extends Command<Args> {
  name = "website:serve"

  description = "Serve a website"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    "rewrite-not-found-to": ty.optional(ty.string()),
    cors: ty.optional(ty.boolean()),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
    "public-url": ty.optional(ty.string()),
    logger: ty.optional(ty.string()),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `and serve it as a website.`,
      ``,
      blue(`  ${runner.name} ${this.name} dist`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    if (argv.logger) {
      changeLogger(argv.logger)
    }

    const who = this.name

    const ctx = await createContext({
      path: argv.path,
      rewriteNotFoundTo: argv["rewrite-not-found-to"],
      cors: argv["cors"],
    })

    const requestListener = createRequestListener({ ctx, handle })
    const tls = maybeTlsOptionsFromArgv(argv)

    const { url } = await startServer(requestListener, {
      hostname: argv.hostname,
      port: argv.port,
      startingPort: 8080,
      tls,
    })

    log({ who, ctx, url: String(url), tls })

    if (argv["public-url"]) {
      const successful = await ReverseProxyClient.connect({
        publicURL: new URL(argv["public-url"]),
        local: {
          hostname: url.hostname,
          port: Number(url.port),
        },
      })

      log({ who, publicURL: argv["public-url"] })

      if (!successful) {
        process.exit(1)
      }
    }
  }
}
