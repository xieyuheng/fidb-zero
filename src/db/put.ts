import { resolve } from "node:path"
import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import type { JsonObject } from "../utils/Json"
import { jsonWrite } from "../utils/jsonWrite"
import { NotFound } from "./errors/NotFound"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { get } from "./get"

export async function put(
  db: Database,
  input: JsonObject & {
    "@id": string
    "@revision": string
  },
): Promise<Data> {
  const id = input["@id"]
  const data = await get(db, id)
  if (data === undefined) {
    throw new NotFound(`[put] not found, id ${id}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[put] revision mismatch`)
  }

  const result = {
    ...input,
    "@id": id,
    "@revision": randomRevision(),
    "@createdAt": data["@createdAt"],
    "@updatedAt": Date.now(),
  }

  await jsonWrite(result, resolve(db.path, id))

  return result
}
