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

export class InitCommand extends Command<Args> {
  name = "init"

  description = "Initialize a directory to be a database"

  args = { path: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `and initialize a database.`,
      ``,
      blue(`  ${runner.name} ${this.name} /databases/test`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const who = this.name

    log({ who })
  }
}
