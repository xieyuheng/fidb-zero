import { resolve } from "node:path"
import type { Data } from "../data"
import { randomRevision, writeData } from "../data"
import type { Database } from "../database"

export async function create(
  db: Database,
  prefix: string,
  input: Omit<Data, "@id" | "@revision">,
): Promise<Data> {
  const id = `${prefix}/${crypto.randomUUID()}`
  const result = { ...input, "@id": id, "@revision": randomRevision() }
  await writeData(resolve(db.path, id), result)
  return result
}
