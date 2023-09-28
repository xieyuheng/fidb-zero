import { Database } from "../../database"
import { NotFound } from "../../errors"
import { fileGetOrFail } from "./fileGetOrFail"

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
