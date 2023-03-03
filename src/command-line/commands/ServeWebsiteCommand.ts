import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { connectReverseProxy } from "../../clients/reverse-proxy-client"
import { createRequestListener } from "../../server/createRequestListener"
import { startServer } from "../../server/startServer"
import { handle } from "../../servers/website-server"
import { createContext } from "../../servers/website-server/Context"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "is-single-page-app"?: boolean
  "tls-cert"?: string
  "tls-key"?: string
  "reverse-proxy-server"?: string
  "reverse-proxy-username"?: string
  "reverse-proxy-password"?: string
}

export class ServeWebsiteCommand extends Command<Args> {
  name = "serve-website"

  description = "Serve a website"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    "is-single-page-app": ty.optional(ty.boolean()),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
    "reverse-proxy-server": ty.optional(ty.string()),
    "reverse-proxy-username": ty.optional(ty.string()),
    "reverse-proxy-password": ty.optional(ty.string()),
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
    const who = this.name

    const ctx = await createContext({ path: argv.path })
    const requestListener = createRequestListener({ ctx, handle })

    const { url } = await startServer(
      {
        who,
        hostname: argv.hostname,
        port: argv.port,
        startingPort: 8080,
        tlsCert: argv["tls-cert"],
        tlsKey: argv["tls-key"],
      },
      requestListener,
    )

    if (
      argv["reverse-proxy-server"] &&
      argv["reverse-proxy-username"] &&
      argv["reverse-proxy-password"]
    ) {
      await connectReverseProxy({
        server: { url: new URL(argv["reverse-proxy-server"]) },
        username: argv["reverse-proxy-username"],
        password: argv["reverse-proxy-password"],
        target: {
          hostname: url.hostname,
          port: Number(url.port),
        },
      })
    }
  }
}
