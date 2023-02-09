import { resolve } from "node:path"
import type { Data } from "../data"
import type { Database } from "../database"
import { readJson } from "../utils/readJson"

export async function getOrFail(db: Database, id: string): Promise<Data> {
  return (await readJson(resolve(db.path, id))) as Data
}
