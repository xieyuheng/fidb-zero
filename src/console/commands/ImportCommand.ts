import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { importDataArrayFromCsv } from "../../data/importDataArrayFromCsv"

type Args = {}
type Opts = { from: string; to: string; "id-key": string }

export class ImportCommand extends Command<Args> {
  name = "import"

  description = "Import data to a database"

  args = {}
  opts = { from: ty.string(), to: ty.string(), "id-key": ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes data from a file,`,
      `and import them to a database directory.`,
      ``,
      blue(`  ${runner.name} ${this.name} --from <file> --to <directory> --id-key <key-name>`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const results = await importDataArrayFromCsv(argv.from, {
      idKey: argv["id-key"],
    })

    console.log(results)
  }
}
