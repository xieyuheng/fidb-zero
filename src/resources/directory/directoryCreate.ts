import fs from "node:fs"
import { type Database } from "../../database/index.js"
import { resolvePath } from "../../database/resolvePath.js"

export async function directoryCreate(
  db: Database,
  directory: string,
): Promise<void> {
  await fs.promises.mkdir(resolvePath(db, directory), {
    recursive: true,
  })
}
