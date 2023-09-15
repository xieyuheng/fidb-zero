import { join, normalize, resolve } from "node:path"
import type { Database } from "./Database"
import { readDatabaseConfigFile } from "./readDatabaseConfigFile"

type Options = {
  directory: string
}

export async function loadDatabase(options: Options): Promise<Database> {
  const directory = normalize(resolve(options.directory))
  const configFile = join(directory, "database.json")
  const config = await readDatabaseConfigFile(configFile)

  return {
    directory,
    config,
  }
}
