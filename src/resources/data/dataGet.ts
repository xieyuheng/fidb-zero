import { Data } from "../../data"
import { Database } from "../../database"
import { NotFound } from "../../errors"
import { dataGetOrFail } from "./dataGetOrFail"

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
