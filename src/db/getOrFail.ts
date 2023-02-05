import { resolve } from "node:path"
import type { Data } from "../data"
import type { Database } from "../database"
import { readData } from "./utils/readData"

export async function getOrFail(db: Database, id: string): Promise<Data> {
  return await readData(resolve(db.path, id))
}
