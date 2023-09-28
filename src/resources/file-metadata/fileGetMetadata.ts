import { Database } from "../../database"
import { NotFound } from "../../errors"
import { FileMetadata, fileGetMetadataOrFail } from "./fileGetMetadataOrFail"

export async function fileGetMetadata(
  db: Database,
  path: string,
): Promise<FileMetadata | undefined> {
  try {
    return await fileGetMetadataOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
