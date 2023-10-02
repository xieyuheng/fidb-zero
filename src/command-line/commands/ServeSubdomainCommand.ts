import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { dirname, join, resolve } from "node:path"
import { readDatabaseConfigFile } from "../../database/readDatabaseConfigFile"
import { startSubdomainServer } from "../../servers/subdomain/startSubdomainServer"
import { pathIsFile } from "../../utils/node/pathIsFile"

type Args = { path: string }
type Opts = {}

export class ServeSubdomainCommand extends Command<Args> {
  name = "serve:subdomain"

  description = "Serve many databases using subdomain-based routing"

  args = { path: ty.string() }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a database.json config file,`,
      `and serve the directory that contains the config file`,
      `using subdomain-based routing.`,
      ``,
      blue(`  ${runner.name} ${this.name} /databases/database.json`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    if (await pathIsFile(argv.path)) {
      const path = resolve(argv.path)
      const directory = dirname(path)
      const configFile = path
      const config = await readDatabaseConfigFile(configFile)
      await startSubdomainServer(directory, config)
    } else {
      const path = resolve(argv.path)
      const directory = path
      const configFile = join(path, "database.json")
      const config = await readDatabaseConfigFile(configFile)
      await startSubdomainServer(directory, config)
    }
  }
}
