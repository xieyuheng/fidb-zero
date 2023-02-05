import { resolve } from "node:path"
import type { JsonObject } from "../utils/Json"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { getOrFail } from "./getOrFail"
import { writeData } from "./utils/writeData"

export async function patch(
  db: Database,
  id: string,
  json: JsonObject,
): Promise<Data> {
  const old = await getOrFail(db, id)
  const data = { ...old, ...json, "@id": id }
  await writeData(resolve(db.path, id), data)
  return data
}
