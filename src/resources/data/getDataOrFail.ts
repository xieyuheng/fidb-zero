import { Data } from "../../data"
import { Database } from "../../database"
import { NotFound } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"
import { readData } from "../utils/readData"

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
