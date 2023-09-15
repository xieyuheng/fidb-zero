import fs from "node:fs"
import { log } from "../utils/log"
import { pathExists } from "../utils/node/pathExists"
import { initDatabaseConfigFile } from "./initDatabaseConfigFile"

export async function init(directory: string): Promise<void> {
  log({ who: "init", directory })

  if (!(await pathExists(directory))) {
    await fs.promises.mkdir(directory, { recursive: true })
  }

  await initDatabaseConfigFile(directory)
}
