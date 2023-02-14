import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { get } from "./get"
import { dataWrite } from "./utils/dataWrite"

export async function put(
  db: Database,
  input: JsonObject & {
    "@path": string
    "@revision": string
  },
): Promise<Data> {
  const path = input["@path"]
  const data = await get(db, path)
  if (data === undefined) {
    throw new NotFound(`[put] not found, path ${path}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[put] revision mismatch`)
  }

  const result = {
    ...input,
    "@path": path,
    "@revision": randomRevision(),
    "@createdAt": data["@createdAt"],
    "@updatedAt": Date.now(),
  }

  await dataWrite(db, result, path)

  return result
}
