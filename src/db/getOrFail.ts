import { resolve } from "node:path"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { readData } from "./utils/readData"

export async function getOrFail(db: Database, id: string): Promise<Data> {
  return await readData(resolve(db.path, id))
}
