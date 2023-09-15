import fs from "node:fs"
import { emptyDatabaseConfig } from "../database"
import { log } from "../utils/log"

export async function initDatabaseConfigFile(file: string): Promise<void> {
  const text = JSON.stringify(emptyDatabaseConfig, null, 2)
  await fs.promises.writeFile(file, text)

  log({
    who: "initDatabaseConfigFile",
    file,
  })
}
