import fs from "node:fs"
import { type Database } from "../../database/index.js"
import { resolvePath } from "../../database/resolvePath.js"
import { NotFound } from "../../errors/index.js"
import { isErrnoException } from "../../utils/node/isErrnoException.js"

export type FileMetadata = {
  size: number
  createdAt: number
  updatedAt: number
}

export async function fileMetadataGetOrFail(
  db: Database,
  path: string,
): Promise<FileMetadata> {
  const who = "fileGetMetadataOrFail"

  try {
    const stats = await fs.promises.stat(resolvePath(db, path))
    return {
      size: stats.size,
      createdAt: stats.birthtimeMs,
      updatedAt: stats.ctimeMs,
    }
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[${who}] path: ${path}`)
    }

    throw error
  }
}
