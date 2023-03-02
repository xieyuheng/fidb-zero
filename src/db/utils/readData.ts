import { Data, DataSchema } from "../../data"
import type { Database } from "../../database"
import { readJson } from "../../utils/node/readJson"
import { resolveDataPath } from "./resolveDataPath"

export async function readData(db: Database, path: string): Promise<Data> {
  const json = await readJson(resolveDataPath(db, path))
  return DataSchema.validate(json)
}
