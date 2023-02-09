import { resolve } from "node:path"
import { Data, dataSchema } from "../data"
import type { Database } from "../database"
import { readJson } from "../utils/readJson"

export async function getOrFail(db: Database, id: string): Promise<Data> {
  const json = await readJson(resolve(db.path, id))
  const data = dataSchema.validate(json)
  return data
}
