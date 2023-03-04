import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import type { Json } from "../utils/Json"
import { fileGetOrFail } from "./fileGetOrFail"

export async function jsonFileGet(
  db: Database,
  path: string,
): Promise<Json | undefined> {
  try {
    const buffer = await fileGetOrFail(db, path)
    return JSON.parse(buffer.toString())
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
