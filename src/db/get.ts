import type { Data } from "../data"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { getOrFail } from "./getOrFail"

export async function get(db: Database, id: string): Promise<Data | undefined> {
  try {
    return await getOrFail(db, id)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
