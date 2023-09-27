import { normalize } from "node:path"
import { Data, randomRevision } from "../../data"
import { Database } from "../../database"
import { NotFound, RevisionMismatch } from "../../errors"
import { JsonObject } from "../../utils/Json"
import { writeData } from "../utils/writeData"
import { getData } from "./getData"

export async function putData(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "putData"

  const data = await getData(db, path)
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
