import fs from "node:fs"
import { join, normalize, resolve } from "node:path"
import { isErrnoException } from "../utils/isErrnoException"
import { readJson } from "../utils/readJson"
import type { Database } from "./Database"
import { DatabaseConfig, databaseConfigSchema } from "./DatabaseConfig"

export async function createDatabase(options: Database): Promise<Database> {
  const path = normalize(resolve(options.path))

  await fs.promises.mkdir(path, { recursive: true })

  const config = await loadDatabaseConfig(path)

  return {
    path,
    config,
  }
}

async function loadDatabaseConfig(
  path: string,
): Promise<DatabaseConfig | undefined> {
  try {
    const json = await readJson(join(path, "database.json"))
    return databaseConfigSchema.validate(json)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return undefined
    }

    throw error
  }
}
