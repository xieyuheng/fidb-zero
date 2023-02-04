import { resolve } from "node:path"
import type { Data, Database } from "."
import type { JsonObject } from "../utils/Json"
import { writeData } from "./utils/writeData"

export async function create(
  db: Database,
  prefix: string,
  json: JsonObject,
): Promise<Data> {
  const id = `${prefix}/${crypto.randomUUID()}`
  const data = { "@id": id, ...json }
  await writeData(resolve(db.path, id), data)
  return data
}
