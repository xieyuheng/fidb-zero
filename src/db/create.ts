import { Data, randomRevision } from "../data"
import type { Database } from "../database"
import { AlreadyExists } from "../errors/AlreadyExists"
import type { JsonObject } from "../utils/Json"
import { get } from "./get"
import { writeData } from "./utils/writeData"

export async function create(
  db: Database,
  input: JsonObject & { "@path": string },
): Promise<Data> {
  const path = input["@path"]
  const data = await get(db, path)
  if (data !== undefined) {
    throw new AlreadyExists(`[create] already exists, @path: ${path}`)
  }

  const result = {
    ...input,
    "@revision": randomRevision(),
    "@createdAt": Date.now(),
    "@updatedAt": Date.now(),
  }

  await writeData(db, path, result)

  return result
}
