import { resolve } from "node:path"
import type { Data } from "../data"
import { dataWrite, randomRevision } from "../data"
import type { Database } from "../database"

export async function create(
  db: Database,
  prefix: string,
  input: Omit<Data, "@id" | "@revision">,
): Promise<Data> {
  const id = `${prefix}/${crypto.randomUUID()}`
  const result = { ...input, "@id": id, "@revision": randomRevision() }
  await dataWrite(result, resolve(db.path, id))
  return result
}
