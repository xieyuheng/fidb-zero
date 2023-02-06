import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../database"

export async function exists(db: Database, path: string): Promise<boolean> {
  try {
    await fs.promises.access(resolve(db.path, path))
    return true
  } catch (_error) {
    return false
  }
}
