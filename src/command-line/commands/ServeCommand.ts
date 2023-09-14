import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { createRequestListener } from "../../server/createRequestListener"
import { startServer } from "../../server/startServer"
import { handle } from "../../servers/database"
import { createContext } from "../../servers/database/Context"
import { changeLogger, log } from "../../utils/log"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "tls-cert"?: string
  "tls-key"?: string
  logger?: string
}

export class ServeCommand extends Command<Args> {
  name = "serve"

  description = "Serve a database"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
    logger: ty.optional(ty.string()),
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
    if (argv.logger) {
      changeLogger(argv.logger)
    }

    const who = this.name

    const ctx = await createContext({ path: argv.path })
    const requestListener = createRequestListener({ ctx, handle })
    const tls =
      argv["tls-cert"] && argv["tls-key"]
        ? {
            certPath: argv["tls-cert"],
            keyPath: argv["tls-key"],
          }
        : undefined

    const { url } = await startServer(requestListener, {
      hostname: argv.hostname,
      port: argv.port,
      startingPort: 5108,
      tls,
    })

    log({ who, ctx, url: String(url), tls })
  }
}
