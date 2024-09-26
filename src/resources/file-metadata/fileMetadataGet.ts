import { type Database } from "../../database/index.js"
import { NotFound } from "../../errors/index.js"
import {
  type FileMetadata,
  fileMetadataGetOrFail,
} from "./fileMetadataGetOrFail.js"

export async function fileMetadataGet(
  db: Database,
  path: string,
): Promise<FileMetadata | undefined> {
  try {
    return await fileMetadataGetOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
