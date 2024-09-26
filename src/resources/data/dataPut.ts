import { normalize } from "node:path"
import { type Data, type Database } from "../../database/index.js"
import { randomRevision } from "../../database/randomRevision.js"
import { writeData } from "../../database/writeData.js"
import { NotFound, RevisionMismatch } from "../../errors/index.js"
import { type JsonObject } from "../../utils/Json.js"
import { dataGet } from "./dataGet.js"

export async function dataPut(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "dataPut"

  const data = await dataGet(db, path)
  if (data === undefined) {
    throw new NotFound(`[${who}] not found, path ${path}`)
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
