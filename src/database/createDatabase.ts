import fs from "node:fs"
import { join, normalize, resolve } from "node:path"
import type { Database } from "./Database"
import { DatabaseConfig, emptyDatabaseConfig } from "./DatabaseConfig"
import { readDatabaseConfigFile } from "./readDatabaseConfigFile"

type Options = {
  path: string
  config?: DatabaseConfig
}

export async function createDatabase(options: Options): Promise<Database> {
  const path = normalize(resolve(options.path))

  await fs.promises.mkdir(path, { recursive: true })

  const configFile = join(path, "database.json")
  const config =
    (await readDatabaseConfigFile(configFile)) || emptyDatabaseConfig

  return {
    path,
    config,
  }
}
