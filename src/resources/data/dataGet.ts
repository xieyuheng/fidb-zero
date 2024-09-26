import { type Data, type Database } from "../../database/index.js"
import { NotFound } from "../../errors/index.js"
import { dataGetOrFail } from "./dataGetOrFail.js"

export async function dataGet(
  db: Database,
  path: string,
): Promise<Data | undefined> {
  try {
    return await dataGetOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
