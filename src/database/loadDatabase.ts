import { join, normalize, resolve } from "node:path"
import type { Database } from "./Database"
import { readDatabaseConfigFile } from "./readDatabaseConfigFile"

type Options = {
  path: string
}

export async function loadDatabase(options: Options): Promise<Database> {
  const path = normalize(resolve(options.path))
  const configFile = join(path, "database.json")
  const config = await readDatabaseConfigFile(configFile)

  return {
    directory: path,
    config,
  }
}
