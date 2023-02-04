import { resolve } from "node:path"
import { Data, Database, getOrFail } from "."
import type { JsonObject } from "../utils/Json"
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
