import { Data, Database } from "../../database"
import { readData } from "../../database/readData"
import { NotFound } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"

export async function getDataOrFail(db: Database, path: string): Promise<Data> {
  const who = "getDataOrFail"

  try {
    return await readData(db, path)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[${who}] path: ${path}`)
    }

    throw error
  }
}
