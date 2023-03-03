import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { connectReverseProxy } from "../../clients/reverse-proxy-client"
import { createRequestListener } from "../../server/createRequestListener"
import { maybeTlsOptionsFromArgv } from "../../server/createServer"
import { startServer } from "../../server/startServer"
import { handle } from "../../servers/database-server"
import { createContext } from "../../servers/database-server/Context"
import { log } from "../../utils/log"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "tls-cert"?: string
  "tls-key"?: string
  url?: string
}

export class ServeDatabaseCommand extends Command<Args> {
  name = "serve-database"

  description = "Serve a database"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
    url: ty.optional(ty.string()),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `and serve it as a database.`,
      ``,
      blue(`  ${runner.name} ${this.name} tmp/databases/test`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const who = this.name

    const ctx = await createContext({ path: argv.path })
    const requestListener = createRequestListener({ ctx, handle })
    const tls = maybeTlsOptionsFromArgv(argv)

    const { url } = await startServer(requestListener, {
      hostname: argv.hostname,
      port: argv.port,
      startingPort: 3000,
      tls,
    })

    log({ who, ctx, url, tls })

    if (argv["url"]) {
      await connectReverseProxy({
        url: new URL(argv["url"]),
        username: "TODO",
        password: "TODO",
        target: {
          hostname: url.hostname,
          port: Number(url.port),
        },
      })
    }
  }
}