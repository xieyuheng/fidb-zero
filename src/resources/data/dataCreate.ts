import { normalize } from "node:path"
import { type Data, type Database } from "../../database/index.js"
import { randomRevision } from "../../database/randomRevision.js"
import { writeData } from "../../database/writeData.js"
import { AlreadyExists } from "../../errors/index.js"
import { type JsonObject } from "../../utils/Json.js"
import { dataGet } from "./dataGet.js"

export async function dataCreate(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const who = "dataCreate"

  const data = await dataGet(db, path)
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
