import { normalize } from "node:path"
import { Data, Database } from "../../database"
import { randomRevision } from "../../database/randomRevision"
import { writeData } from "../../database/writeData"
import { NotFound, RevisionMismatch } from "../../errors"
import { JsonObject } from "../../utils/Json"
import { getData } from "./getData"

export async function patchData(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "patchData"

  const data = await getData(db, path)
  if (data === undefined) {
    throw new NotFound(`[${who}] not found, path ${path}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[${who}] revision mismatch`)
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