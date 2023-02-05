import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"
import type { Data } from "./Data"
import { getOrFail } from "./getOrFail"

export async function get(db: Database, id: string): Promise<Data | undefined> {
  try {
    return await getOrFail(db, id)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      return undefined
    }

    throw error
  }
}
