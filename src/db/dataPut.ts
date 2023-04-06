import { normalize } from "node:path"
import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { dataCreate } from "./dataCreate"
import { dataGet } from "./dataGet"
import { writeData } from "./utils/writeData"

export async function dataPut(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "dataPut"

  const data = await dataGet(db, path)
  if (data === undefined) {
    return await dataCreate(db, path, input)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[${who}] revision mismatch`)
  }

  const result = {
    ...input,
    "@path": normalize(path),
    "@revision": randomRevision(),
    "@createdAt": data["@createdAt"],
    "@updatedAt": Date.now(),
  }

  await writeData(db, path, result)

  return result
}
