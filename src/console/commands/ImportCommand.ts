import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { resolve } from "path"
import { importDataArrayFromCsv } from "../../data/importDataArrayFromCsv"
import { jsonWrite } from "../../utils/jsonWrite"

type Args = { database: string }
type Opts = { from: string; directory: string; "id-key": string }

export class ImportCommand extends Command<Args> {
  name = "import"

  description = "Import data to a database"

  args = { database: ty.string() }
  opts = { from: ty.string(), directory: ty.string(), "id-key": ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes data from a file,`,
      `and import them to a database directory.`,
      ``,
      blue(`  ${runner.name} ${this.name} <database> --from <file> --directory <directory> --id-key <key-name>`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const results = await importDataArrayFromCsv(argv.from, {
      directory: argv.directory,
      idKey: argv["id-key"],
    })

    for (const data of results) {
      const file = resolve(argv.database, data["@id"])
      await jsonWrite(data, file)
      console.log(">", file)
    }

    console.log({
      message: `[ImportCommand]`,
      length: results.length,
    })
  }
}
