import { type Database } from "../../database/index.js"
import { NotFound } from "../../errors/index.js"
import { fileGetOrFail } from "./fileGetOrFail.js"

export async function fileGet(
  db: Database,
  path: string,
): Promise<Uint8Array | undefined> {
  try {
    return await fileGetOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
