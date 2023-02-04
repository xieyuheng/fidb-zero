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
  const data = { ...(await getOrFail(db, id)), ...json }
  await writeData(resolve(db.path, id), data)
  return data
}
