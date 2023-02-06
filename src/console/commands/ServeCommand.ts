import { Command, CommandRunner } from "@xieyuheng/command-line"

type Args = {}

export class ServeCommand extends Command<Args> {
  name = "serve"

  description = "Serve an database"

  args = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes you into a rabbit hole`,
      `  called REPL -- "Read Evaluate Print Loop".`,
      ``,
      `In which you can try some ideas real quick.`,
      ``,
      blue(`  ${runner.name} ${this.name}`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args): Promise<void> {
    console.log(argv)
  }
}
