import fs from "node:fs"
import process from "node:process"
import { type Database, loadDatabase } from "../../database/index.js"
import { log } from "../../utils/log.js"
import { pathExists } from "../../utils/node/pathExists.js"
import { initDatabaseConfigFile } from "./initDatabaseConfigFile.js"
import { initSystemResource } from "./initSystemResource.js"

export async function initDatabase(directory: string): Promise<Database> {
  log({ who: "initDatabase", directory })

  if (!(await pathExists(directory))) {
    await fs.promises.mkdir(directory, { recursive: true })
  }

  const configFile = `${directory}/database.json`

  if (await pathExists(configFile)) {
    log({
      who: "init",
      kind: "Error",
      message: "Config file already exists.",
      directory,
      configFile,
    })

    process.exit(1)
  }

  await initDatabaseConfigFile(configFile)

  const db = await loadDatabase({ directory })

  await initSystemResource(db)

  return db
}
