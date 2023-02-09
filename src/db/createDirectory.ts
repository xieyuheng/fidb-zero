import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../database"

export async function createDirectory(
  db: Database,
  directory: string,
): Promise<void> {
  await fs.promises.mkdir(resolve(db.path, directory), {
    recursive: true,
  })
}
