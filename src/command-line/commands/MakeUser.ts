import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"

type Args = { "name:group": string }
type Opts = {}

export class MakeUser extends Command<Args> {
  name = "make:user"

  description = "Make a user"

  args = { "name:group": ty.string() }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a username`,
      `and the user's groups to create a user in the database.`,
      `The user's initial password will be asked during the making.`,
      ``,
      blue(`  ${runner.name} ${this.name} owner:owner`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    console.log(argv)
  }
}
