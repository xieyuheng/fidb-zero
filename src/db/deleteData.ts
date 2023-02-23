import type { Database } from "../database"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { getData } from "./getData"
import { deletePathRecursive } from "./utils/deletePath"

export async function deleteData(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<void> {
  const data = await getData(db, path)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[delete] revision mismatch`)
  }

  await deletePathRecursive(db, path)
}
