import { resolve } from "node:path"
import type { Data } from "./Data"
import type { Database } from "./Database"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { get } from "./get"
import { randomRevision } from "./utils/randomRevision"
import { writeData } from "./utils/writeData"

export async function put(
  db: Database,
  input: Omit<Data, "@revision">,
): Promise<Data> {
  const id = input["@id"] as string
  const data = await get(db, id)
  if (data !== undefined && data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[put] revision mismatch`)
  }

  const result = { ...input, "@id": id, "@revision": randomRevision() }
  await writeData(resolve(db.path, id), result)
  return result
}
