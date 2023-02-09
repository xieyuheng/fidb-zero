import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../database"

export async function deleteDirectory(
  db: Database,
  directory: string,
): Promise<void> {
  await fs.promises.rm(resolve(db.path, directory), {
    force: true,
    recursive: true,
  })
}
