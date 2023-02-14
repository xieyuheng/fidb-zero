import { resolve } from "node:path"
import { Data, dataSchema } from "../../data"
import type { Database } from "../../database"
import { readJson } from "../../utils/readJson"

export async function readData(db: Database, path: string): Promise<Data> {
  path = resolve(db.path, path + "/index.json")

  const json = await readJson(path)
  return dataSchema.validate(json)
}
