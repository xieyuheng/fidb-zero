import type { Buffer } from "node:buffer"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { getFileOrFail } from "./getFileOrFail"

export async function getFile(
  db: Database,
  path: string,
): Promise<Buffer | undefined> {
  try {
    return await getFileOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
