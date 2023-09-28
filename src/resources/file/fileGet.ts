import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { NotFound } from "../../errors"
import { fileGetOrFail } from "./fileGetOrFail"

export async function fileGet(
  db: Database,
  path: string,
): Promise<Buffer | undefined> {
  try {
    return await fileGetOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
