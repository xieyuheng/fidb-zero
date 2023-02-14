import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../../database"

export async function deleteData(db: Database, path: string): Promise<void> {
  path = resolve(db.path, path)

  await fs.promises.rm(path, { recursive: true, force: true })
}
