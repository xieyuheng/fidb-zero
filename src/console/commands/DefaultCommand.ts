import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import * as Commands from "../commands"

type Args = { file?: string }
type Opts = { help?: boolean; version?: boolean }

export class DefaultCommand extends Command<Args, Opts> {
  name = "default"

  description = "Print help message by default"

  args = { file: ty.optional(ty.string()) }
  opts = {
    help: ty.optional(ty.boolean()),
    version: ty.optional(ty.boolean()),
  }
  alias = { help: ["h"], version: ["v"] }

  async execute(argv: Args & Opts, runner: CommandRunner): Promise<void> {
    if (argv["version"]) {
      console.log(app.config.pkg.version)
      return
    }

    const command = new Commands.CommonHelpCommand()
    await command.execute({}, runner)
  }
}
