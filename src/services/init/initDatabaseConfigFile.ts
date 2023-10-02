import fs from "node:fs"
import { DatabaseConfig } from "../../database"
import { emptyDatabaseConfig } from "../../database/emptyDatabaseConfig"
import { log } from "../../utils/log"

export async function initDatabaseConfigFile(
  file: string,
): Promise<DatabaseConfig> {
  const config = emptyDatabaseConfig
  const text = JSON.stringify(config, null, 2)
  await fs.promises.writeFile(file, text)

  log({
    who: "initDatabaseConfigFile",
    file,
  })

  return config
}
