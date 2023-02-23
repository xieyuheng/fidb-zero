import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { FileMetadata, getFileMetadataOrFail } from "./getFileMetadataOrFail"

export async function getFileMetadata(
  db: Database,
  path: string,
): Promise<FileMetadata | undefined> {
  try {
    return await getFileMetadataOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
