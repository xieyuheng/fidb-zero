import { resolve } from "node:path"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { randomRevision } from "./utils/randomRevision"
import { writeData } from "./utils/writeData"

export async function create(
  db: Database,
  prefix: string,
  input: Omit<Data, "@id" | "@revision">,
): Promise<Data> {
  const id = `${prefix}/${crypto.randomUUID()}`
  const data = { ...input, "@id": id, "@revision": randomRevision() }
  await writeData(resolve(db.path, id), data)
  return data
}
