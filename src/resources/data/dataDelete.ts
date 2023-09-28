import { Database } from "../../database"
import { deletePathRecursive } from "../../database/deletePath"
import { RevisionMismatch } from "../../errors"
import { JsonObject } from "../../utils/Json"
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
