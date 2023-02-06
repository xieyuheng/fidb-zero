import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"

export async function isFile(db: Database, path: string): Promise<boolean> {
  try {
    const stats = await fs.promises.stat(resolve(db.path, path))
    return stats.isFile()
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return false
    }

    throw error
  }
}
