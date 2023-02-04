import { resolve } from "node:path"
import type { JsonObject } from "../utils/Json"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { writeData } from "./utils/writeData"

export async function put(
  db: Database,
  id: string,
  json: JsonObject,
): Promise<Data> {
  const data = { "@id": id, ...json }
  await writeData(resolve(db.path, id), data)
  return data
}
