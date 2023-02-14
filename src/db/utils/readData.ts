import { Data, dataSchema } from "../../data"
import type { Database } from "../../database"
import { readJson } from "../../utils/readJson"
import { resolvePath } from "./resolvePath"

export async function readData(db: Database, path: string): Promise<Data> {
  const json = await readJson(resolvePath(db, path + "/index.json"))
  return dataSchema.validate(json)
}
