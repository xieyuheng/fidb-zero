import fs from "node:fs"
import process from "node:process"
import { createDatabase } from "../database"
import { log } from "../utils/log"
import { pathExists } from "../utils/node/pathExists"
import { initDatabaseConfigFile } from "./initDatabaseConfigFile"
import { initSystemResource } from "./initDotConfig"

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

  const config = await initDatabaseConfigFile(configFile)
  const db = await createDatabase({ path: directory, config })
  await initSystemResource(db)
}
