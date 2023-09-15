import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { createRequestListener } from "../../server/createRequestListener"
import { handle } from "../../servers/database"
import { createContext } from "../../servers/database/createContext"
import { startServer } from "../../servers/database/startServer"
import {
  LoggerName,
  LoggerNameSchema,
  changeLogger,
  log,
} from "../../utils/log"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "tls-cert"?: string
  "tls-key"?: string
  "logger-name"?: LoggerName
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
    "logger-name": ty.optional(LoggerNameSchema),
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
    changeLogger(argv["logger-name"] || "pretty-line")

    const who = this.name

    const ctx = await createContext({ path: argv.path })
    log({ who, message: "createContext", config: ctx.db.config })

    const requestListener = createRequestListener({ ctx, handle })
    const tls =
      argv["tls-cert"] && argv["tls-key"]
        ? {
            cert: argv["tls-cert"],
            key: argv["tls-key"],
          }
        : undefined

    await startServer(requestListener, {
      server: {
        hostname: argv.hostname,
        port: argv.port,
        startingPort: 5108,
        tls,
      },
    })
  }
}
