import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import Path from "node:path"
import { init } from "../../init/init"
import { changeLogger } from "../../utils/log"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "tls-cert"?: string
  "tls-key"?: string
  logger?: string
}

export class InitDatabase extends Command<Args> {
  name = "init:database"

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
    changeLogger("pretty-line")

    const directory = Path.resolve(argv.path)
    init(directory)
  }
}
