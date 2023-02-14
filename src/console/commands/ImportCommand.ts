import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { importDataArrayFromCsv } from "../../data/importDataArrayFromCsv"
import { createDatabase } from "../../database"
import { writeData } from "../../db/utils/writeData"

type Args = { database: string }
type Opts = { from: string; directory: string; "primary-key": string }

export class ImportCommand extends Command<Args> {
  name = "import"

  description = "Import data to a database"

  args = { database: ty.string() }
  opts = {
    from: ty.string(),
    directory: ty.string(),
    "primary-key": ty.string(),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes data from a csv file,`,
      `and import them to a database directory.`,
      ``,
      blue(`  ${runner.name} ${this.name} <database> --from <csv-file> --directory <directory> --primary-key <key-name>`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const results = await importDataArrayFromCsv(argv.from, {
      directory: argv.directory,
      primaryKey: argv["primary-key"],
    })

    for (const data of results) {
      const db = await createDatabase({ path: argv.database })
      const path = data["@path"]
      await writeData(db, path, data)
      console.log(data)
    }

    console.log({
      message: `[ImportCommand]`,
      length: results.length,
    })
  }
}
