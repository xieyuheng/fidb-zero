import { normalize } from "node:path"
import { Data, Database, randomRevision } from "../../database"
import { AlreadyExists } from "../../errors"
import { JsonObject } from "../../utils/Json"
import { writeData } from "../utils/writeData"
import { getData } from "./getData"

export async function createData(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "createData"

  const data = await getData(db, path)
  if (data !== undefined) {
    throw new AlreadyExists(`[${who}] already exists, path: ${path}`)
  }

  const result = {
    ...input,
    "@path": normalize(path),
    "@revision": randomRevision(),
    "@createdAt": Date.now(),
    "@updatedAt": Date.now(),
  }

  await writeData(db, path, result)

  return result
}
