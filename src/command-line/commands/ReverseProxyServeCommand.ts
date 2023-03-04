import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { handle } from "../../reverse-proxy-server"
import { createContext } from "../../reverse-proxy-server/Context"
import { createRequestListener } from "../../server/createRequestListener"
import { maybeTlsOptionsFromArgv } from "../../server/createServer"
import { startServer } from "../../server/startServer"
import { changeLogger, log } from "../../utils/log"

type Args = {}
type Opts = {
  database: string
  domain: string
  port?: number | Array<number>
  "tls-cert"?: string
  "tls-key"?: string
  logger?: string
}

export class ReverseProxyServeCommand extends Command<Args> {
  name = "reverse-proxy:serve"

  description = "Serve a reverse proxy"

  args = {}
  opts = {
    database: ty.string(),
    domain: ty.string(),
    port: ty.optional(ty.union(ty.number(), ty.array(ty.number()))),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
    logger: ty.optional(ty.string()),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `using it as a database, and serve a reverse proxy.`,
      ``,
      blue(`  ${runner.name} ${this.name} --database tmp/databases/reverse-proxy`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    if (argv.logger) {
      changeLogger(argv.logger)
    }

    const who = this.name

    const tls = maybeTlsOptionsFromArgv(argv)

    if (typeof argv.port === "number" || argv.port === undefined) {
      const ctx = await createContext({
        path: argv.database,
        domain: argv.domain,
        availablePorts: [Number(argv.port)],
      })

      const requestListener = createRequestListener({ ctx, handle })

      const { url } = await startServer(requestListener, {
        hostname: argv.domain,
        port: argv.port,
        startingPort: 3000,
        tls,
      })

      log({ who, ctx, url, tls })
    }

    if (argv.port instanceof Array) {
      const urls = []

      for (const port of argv.port) {
        // NOTE `ctx` must not be shared.

        const ctx = await createContext({
          path: argv.database,
          domain: argv.domain,
          availablePorts: argv.port.map(Number),
        })

        const requestListener = createRequestListener({ ctx, handle })

        const { url } = await startServer(requestListener, {
          hostname: argv.domain,
          port,
          tls,
        })
        urls.push(url)
      }

      // NOTE This `ctx` is only for log.

      const ctx = await createContext({
        path: argv.database,
        domain: argv.domain,
        availablePorts: argv.port.map(Number),
      })

      log({ who, ctx, urls, tls })
    }
  }
}
