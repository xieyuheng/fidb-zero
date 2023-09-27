import { Data } from "../../data"
import { Database } from "../../database"
import { NotFound } from "../../errors"
import { getDataOrFail } from "./getDataOrFail"

export async function getData(
  db: Database,
  path: string,
): Promise<Data | undefined> {
  try {
    return await getDataOrFail(db, path)
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
