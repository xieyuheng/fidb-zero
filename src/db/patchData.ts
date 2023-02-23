import { normalize } from "node:path"
import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { getData } from "./getData"
import { writeData } from "./utils/writeData"

export async function patchData(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const data = await getData(db, path)
  if (data === undefined) {
    throw new NotFound(`[patch] not found, path ${path}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[patch] revision mismatch`)
  }

  const result = {
    ...data,
    ...input,
    "@path": normalize(path),
    "@revision": randomRevision(),
    "@updatedAt": Date.now(),
  }

  await writeData(db, path, result)

  return result
}