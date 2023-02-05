import { resolve } from "node:path"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { WriteConflict } from "./errors/WriteConflict"
import { get } from "./get"
import { randomRevision } from "./utils/randomRevision"
import { writeData } from "./utils/writeData"

export async function put(
  db: Database,
  id: string,
  input: Omit<Data, "@id">,
): Promise<Data> {
  const old = await get(db, id)
  if (old !== undefined && old["@revision"] !== input["@revision"]) {
    throw new WriteConflict(`[put] revision mismatch`)
  }

  const data = { ...input, "@id": id, "@revision": randomRevision() }
  await writeData(resolve(db.path, id), data)
  return data
}
