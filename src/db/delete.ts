import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "../database"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import type { JsonObject } from "../utils/Json"
import { get } from "./get"

// NOTE `delete` is preserved javascript keyword.

export async function del(
  db: Database,
  input: JsonObject & { "@id": string; "@revision": string },
): Promise<void> {
  const id = input["@id"]
  const data = await get(db, id)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new RevisionMismatch(`[delete] revision mismatch`)
  }

  await fs.promises.rm(resolve(db.path, id), { force: true })
}
