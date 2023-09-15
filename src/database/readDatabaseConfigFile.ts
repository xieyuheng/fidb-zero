import { isErrnoException } from "../utils/node/isErrnoException"
import { readJson } from "../utils/node/readJson"
import { DatabaseConfig, DatabaseConfigOptionsSchema } from "./DatabaseConfig"

export async function readDatabaseConfigFile(
  file: string,
): Promise<DatabaseConfig | undefined> {
  try {
    const json = await readJson(file)
    const options = DatabaseConfigOptionsSchema.validate(json)
    return {
      name: options.name,
      description: options.description || "",
    }
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return undefined
    }

    throw error
  }
}
