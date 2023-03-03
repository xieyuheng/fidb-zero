import { Data, DataSchema } from "../data"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { isErrnoException } from "../utils/node/isErrnoException"
import { readData } from "./utils/readData"

export async function dataGetOrFail(db: Database, path: string): Promise<Data> {
  try {
    const json = await readData(db, path)
    const data = DataSchema.validate(json)
    return data
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[getOrFail] path: ${path}`)
    }

    throw error
  }
}
