import fs from "node:fs"
import type { Database } from "../../database"
import { resolvePath } from "./resolvePath"

export async function exists(db: Database, path: string): Promise<boolean> {
  try {
    await fs.promises.access(resolvePath(db, path))
    return true
  } catch (_error) {
    return false
  }
}
