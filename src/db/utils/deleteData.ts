import fs from "node:fs"
import type { Database } from "../../database"
import { resolvePath } from "./resolvePath"

export async function deleteData(db: Database, path: string): Promise<void> {
  await fs.promises.rm(resolvePath(db, path), {
    recursive: true,
    force: true,
  })
}
