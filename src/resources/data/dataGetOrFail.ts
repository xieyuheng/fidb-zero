import { type Data, type Database } from "../../database/index.js"
import { readData } from "../../database/readData.js"
import { NotFound } from "../../errors/index.js"
import { isErrnoException } from "../../utils/node/isErrnoException.js"

export async function dataGetOrFail(db: Database, path: string): Promise<Data> {
  const who = "dataGetOrFail.js"

  try {
    return await readData(db, path)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[${who}] path: ${path}`)
    }

    throw error
  }
}
