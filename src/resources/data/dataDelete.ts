import { deletePathRecursive } from "../../database/deletePath.js"
import { type Database } from "../../database/index.js"
import { RevisionMismatch } from "../../errors/index.js"
import { type JsonObject } from "../../utils/Json.js"
import { dataGet } from "./dataGet.js"

export async function dataDelete(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<void> {
  const who = "dataDelete"

  const data = await dataGet(db, path)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[${who}] revision mismatch`)
  }

  await deletePathRecursive(db, path)
}
