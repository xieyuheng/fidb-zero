import fs from "node:fs"
import type { Database } from "../../database"
import { resolveDataPath } from "./resolveDataPath"

export async function deleteData(db: Database, path: string): Promise<void> {
  await fs.promises.rm(resolveDataPath(db, path), {
    recursive: true,
    force: true,
  })
}
