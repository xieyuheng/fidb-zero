import fs from "node:fs"
import { Database } from "../../database"
import { resolvePath } from "../../database/resolvePath"
import { NotFound } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"

export type FileMetadata = {
  size: number
  createdAt: number
  updatedAt: number
}

export async function getFileMetadataOrFail(
  db: Database,
  path: string,
): Promise<FileMetadata> {
  const who = "getFileMetadataOrFail"

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