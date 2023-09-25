import fs from "node:fs"
import { Database } from "../database"
import { resolvePath } from "./utils/resolvePath"

export async function directoryDelete(
  db: Database,
  directory: string,
): Promise<void> {
  await fs.promises.rm(resolvePath(db, directory), {
    force: true,
    recursive: true,
  })
}
