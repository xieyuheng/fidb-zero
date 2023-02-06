import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../database"

export async function isDirectory(
  db: Database,
  path: string,
): Promise<boolean> {
  const stats = await fs.promises.stat(resolve(db.path, path))
  return stats.isDirectory()
}
