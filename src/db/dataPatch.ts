import { normalize } from "node:path"
import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { dataGet } from "./dataGet"
import { writeData } from "./utils/writeData"

export async function dataPatch(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const data = await dataGet(db, path)
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
