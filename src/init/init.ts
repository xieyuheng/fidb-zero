import fs from "node:fs"
import process from "node:process"
import { loadDatabase } from "../database"
import { log } from "../utils/log"
import { pathExists } from "../utils/node/pathExists"
import { initDatabaseConfigFile } from "./initDatabaseConfigFile"
import { initExampleUsers } from "./initExampleUsers"
import { initSystemResource } from "./initSystemResource"

export async function init(directory: string): Promise<void> {
  log({ who: "init", directory })

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
  await initExampleUsers(db)
}
