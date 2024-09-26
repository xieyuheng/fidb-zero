import { readJson } from "../utils/node/readJson.js"
import { type DatabaseConfig, DatabaseConfigSchema } from "./DatabaseConfig.js"

export async function readDatabaseConfigFile(
  file: string,
): Promise<DatabaseConfig> {
  const json = await readJson(file)
  return DatabaseConfigSchema.validate(json)
}
