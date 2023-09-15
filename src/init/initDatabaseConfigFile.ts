import fs from "node:fs"
import { emptyDatabaseConfig } from "../database"

export async function initDatabaseConfigFile(directory: string): Promise<void> {
  const file = `${directory}/database.json`
  const text = JSON.stringify(emptyDatabaseConfig, null, 2)
  await fs.promises.writeFile(file, text)
}
