import { Data, Database, getOrFail } from "."
import { isErrnoException } from "../utils/isErrnoException"

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
