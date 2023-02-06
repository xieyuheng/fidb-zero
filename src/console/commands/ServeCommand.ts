import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"

type Args = { dir: string }
type Opts = { host: string; port: number }

export class ServeCommand extends Command<Args> {
  name = "serve"

  description = "Serve a database"

  args = { dir: ty.string() }
  opts = { host: ty.string(), port: ty.number() }

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
