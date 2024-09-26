import fs from "node:fs"
import { type Database } from "../../database/index.js"
import { resolvePath } from "../../database/resolvePath.js"

export async function directoryDelete(
  db: Database,
  directory: string,
): Promise<void> {
  await fs.promises.rm(resolvePath(db, directory), {
    force: true,
    recursive: true,
  })
}
