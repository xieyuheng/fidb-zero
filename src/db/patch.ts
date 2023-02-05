import { resolve } from "node:path"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { NotFound } from "./errors/NotFound"
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
  if (data === undefined) {
    throw new NotFound(`[patch] not found, id ${id}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new WriteConflict(`[patch] revision mismatch`)
  }

  const result = { ...data, ...input, "@id": id, "@revision": randomRevision() }
  await writeData(resolve(db.path, id), result)
  return result
}
