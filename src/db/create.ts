import { resolve } from "node:path"
import type { Data } from "../data"
import { dataWrite, randomRevision } from "../data"
import type { Database } from "../database"
import type { JsonObject } from "../utils/Json"
import { AlreadyExists } from "./errors/AlreadyExists"
import { get } from "./get"

export async function create(
  db: Database,
  input: JsonObject & { "@id": string },
): Promise<Data> {
  const id = input["@id"]
  const data = await get(db, id)
  if (data !== undefined) {
    throw new AlreadyExists(`[create] already exists, @id: ${id}`)
  }

  const result = {
    ...input,
    "@revision": randomRevision(),
    "@createdAt": Date.now(),
    "@updatedAt": Date.now(),
  }

  await dataWrite(result, resolve(db.path, id))

  return result
}
