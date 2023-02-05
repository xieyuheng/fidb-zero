import { resolve } from "node:path"
import { Data, DataOmitRevision, dataWrite, randomRevision } from "../data"
import type { Database } from "../database"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { get } from "./get"

export async function put(
  db: Database,
  input: DataOmitRevision,
): Promise<Data> {
  const id = input["@id"]
  const data = await get(db, id)
  if (data !== undefined && data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[put] revision mismatch`)
  }

  const result = { ...input, "@id": id, "@revision": randomRevision() }
  await dataWrite(result, resolve(db.path, id))
  return result
}
