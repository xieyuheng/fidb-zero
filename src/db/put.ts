import { resolve } from "node:path"
import { Data, dataWrite, randomRevision } from "../data"
import type { Database } from "../database"
import { NotFound } from "./errors/NotFound"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { get } from "./get"

export async function put(db: Database, input: Data): Promise<Data> {
  const id = input["@id"]
  const data = await get(db, id)
  if (data === undefined) {
    throw new NotFound(`[put] not found, id ${id}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[put] revision mismatch`)
  }

  const result = { ...input, "@id": id, "@revision": randomRevision() }
  await dataWrite(result, resolve(db.path, id))
  return result
}
