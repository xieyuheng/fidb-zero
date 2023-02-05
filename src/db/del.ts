import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "./Database"
import { WriteConflict } from "./errors/WriteConflict"
import { get } from "./get"

// NOTE `delete` is preserved javascript keyword.

export async function del(
  db: Database,
  id: string,
  input: { "@revision": string },
): Promise<void> {
  const data = await get(db, id)
  if (data === undefined) {
    return
  }

  if (data["@revision"] !== input["@revision"]) {
    throw new WriteConflict(`[delete] revision mismatch`)
  }

  await fs.promises.rm(resolve(db.path, id), { force: true })
}
