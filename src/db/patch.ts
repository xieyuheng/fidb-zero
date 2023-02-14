import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { get } from "./get"
import { dataWrite } from "./utils/dataWrite"

export async function patch(
  db: Database,
  input: JsonObject & {
    "@path": string
    "@revision": string
  },
): Promise<Data> {
  const path = input["@path"]
  const data = await get(db, path)
  if (data === undefined) {
    throw new NotFound(`[patch] not found, path ${path}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[patch] revision mismatch`)
  }

  const result = {
    ...data,
    ...input,
    "@path": path,
    "@revision": randomRevision(),
    "@updatedAt": Date.now(),
  }

  await dataWrite(db, result, path)

  return result
}
