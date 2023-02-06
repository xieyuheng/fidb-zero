import { resolve } from "node:path"
import type { Data, DataOmitRevision } from "../data"
import { dataWrite, randomRevision } from "../data"
import type { Database } from "../database"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { get } from "./get"

export async function create(
  db: Database,
  input: DataOmitRevision,
): Promise<Data> {
  const id = input["@id"]
  const data = await get(db, id)
  if (data !== undefined) {
    throw new RevisionMismatch(`[create] already exists, id: ${id}`)
  }

  const result = { ...input, "@revision": randomRevision() }
  await dataWrite(result, resolve(db.path, id))
  return result
}
