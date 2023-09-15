import { readJson } from "../utils/node/readJson"
import { DatabaseConfig, DatabaseConfigSchema } from "./DatabaseConfig"

export async function readDatabaseConfigFile(
  file: string,
): Promise<DatabaseConfig> {
  const json = await readJson(file)
  return DatabaseConfigSchema.validate(json)
}
