import { normalize } from "node:path"
import { Data, Database } from "../../database"
import { randomRevision } from "../../database/randomRevision"
import { writeData } from "../../database/writeData"
import { NotFound, RevisionMismatch } from "../../errors"
import { JsonObject } from "../../utils/Json"
import { objectMergeProperties } from "../../utils/objectMergeProperties"
import { dataGet } from "./dataGet"

export async function dataPatch(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "dataPatch"

  const data = await dataGet(db, path)
  if (data === undefined) {
    throw new NotFound(`[${who}] not found, path ${path}`)
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[${who}] revision mismatch`)
  }

  const result = {
    ...objectMergeProperties(data, input),
    "@path": normalize(path),
    "@revision": randomRevision(),
    "@updatedAt": Date.now(),
    "@createdAt": data["@createdAt"],
  }

  await writeData(db, path, result)

  return result
}
