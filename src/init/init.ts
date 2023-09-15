import fs from "node:fs"
import process from "node:process"
import { log } from "../utils/log"
import { pathExists } from "../utils/node/pathExists"
import { initDatabaseConfigFile } from "./initDatabaseConfigFile"

export async function init(directory: string): Promise<void> {
  log({ who: "init", directory })

  if (!(await pathExists(directory))) {
    await fs.promises.mkdir(directory, { recursive: true })
  }

  const configFile = `${directory}/database.json`
  if (await pathExists(configFile)) {
    log({
      who: "init",
      message: "Config file already exists.",
      directory,
      configFile
    })

    process.exit(1)
  }

  await initDatabaseConfigFile(configFile)
}
