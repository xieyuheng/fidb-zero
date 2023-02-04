import { isErrnoException } from "src/utils/isErrnoException"
import { Data, Database, getOrFail } from "."

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
