import fs from "node:fs"
import { emptyDatabaseConfig } from "../../database/emptyDatabaseConfig.js"
import { type DatabaseConfig } from "../../database/index.js"
import { log } from "../../utils/log.js"

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
