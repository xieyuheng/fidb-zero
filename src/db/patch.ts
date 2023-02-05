import { resolve } from "node:path"
import type { JsonObject as Data } from "../utils/Json"
import type { Database } from "./Database"
import { WriteConflict } from "./errors/WriteConflict"
import { get } from "./get"
import { randomRevision } from "./utils/randomRevision"
import { writeData } from "./utils/writeData"

export async function patch(
  db: Database,
  id: string,
  input: Omit<Data, "@id">,
): Promise<Data> {
  const data = await get(db, id)
  if (data !== undefined && data["@revision"] !== input["@revision"]) {
    throw new WriteConflict(`[patch] revision mismatch`)
  }

  const result = { ...data, ...input, "@id": id, "@revision": randomRevision() }
  await writeData(resolve(db.path, id), result)
  return result
}
