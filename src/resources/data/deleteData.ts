import { Database } from "../../database"
import { deletePathRecursive } from "../../database/deletePath"
import { RevisionMismatch } from "../../errors"
import { JsonObject } from "../../utils/Json"
import { getData } from "./getData"

export async function deleteData(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<void> {
  const who = "deleteData"

  const data = await getData(db, path)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[${who}] revision mismatch`)
  }

  await deletePathRecursive(db, path)
}
