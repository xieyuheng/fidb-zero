import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { createRequestListener } from "../../server/createRequestListener"
import { maybeTlsOptionsFromArgv } from "../../server/createServer"
import { startServer } from "../../server/startServer"
import { handle } from "../../servers/reverse-proxy-server"
import { createContext } from "../../servers/reverse-proxy-server/Context"
import { log } from "../../utils/log"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "tls-cert"?: string
  "tls-key"?: string
}

export class ServeReverseProxyCommand extends Command<Args> {
  name = "serve-reverse-proxy"

  description = "Serve a reverse proxy"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `using it as a database, and serve a reverse proxy.`,
      ``,
      blue(`  ${runner.name} ${this.name} tmp/databases/reverse-proxy`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const who = this.name

    const ctx = await createContext({ path: argv.path })
    const requestListener = createRequestListener({ ctx, handle })
    const tls = maybeTlsOptionsFromArgv(argv)

    log({ who, ctx, tls })

    await startServer(
      {
        who,
        hostname: argv.hostname,
        port: argv.port,
        startingPort: 3000,
        tls,
      },
      requestListener,
    )
  }
}
