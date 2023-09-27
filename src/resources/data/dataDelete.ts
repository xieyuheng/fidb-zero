import { Database } from "../../database"
import { RevisionMismatch } from "../../errors"
import { JsonObject } from "../../utils/Json"
import { deletePathRecursive } from "../utils/deletePath"
import { dataGet } from "./dataGet"

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
