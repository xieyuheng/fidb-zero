import type { Database } from "../database"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { get } from "./get"
import { deleteRecursive } from "./utils/deleteRecursive"

// NOTE `delete` is preserved javascript keyword.

export async function del(
  db: Database,
  path: string,
  input: JsonObject,
): Promise<void> {
  const data = await get(db, path)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[delete] revision mismatch`)
  }

  await deleteRecursive(db, path)
}
