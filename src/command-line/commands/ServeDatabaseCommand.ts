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
  "reverse-proxy-server"?: string
  "reverse-proxy-username"?: string
  "reverse-proxy-password"?: string
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
    "reverse-proxy-server": ty.optional(ty.string()),
    "reverse-proxy-username": ty.optional(ty.string()),
    "reverse-proxy-password": ty.optional(ty.string()),
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

    log({ who, ctx, tls })

    const { url } = await startServer(
      {
        who,
        hostname: argv.hostname,
        port: argv.port,
        startingPort: 3000,
        tls,
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
