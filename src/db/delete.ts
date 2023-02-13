import { resolve } from "node:path"
import { deleteData } from "../data"
import type { Database } from "../database"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { get } from "./get"

// NOTE `delete` is preserved javascript keyword.

export async function del(
  db: Database,
  input: JsonObject & { "@path": string; "@revision": string },
): Promise<void> {
  const path = input["@path"]
  const data = await get(db, path)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[delete] revision mismatch`)
  }

  await deleteData(resolve(db.path, path))
}
