import fs from "node:fs"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"
import { resolvePath } from "./utils/resolvePath"

export async function isDirectory(
  db: Database,
  path: string,
): Promise<boolean> {
  try {
    const stats = await fs.promises.stat(resolvePath(db, path))
    return stats.isDirectory()
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return false
    }

    throw error
  }
}
