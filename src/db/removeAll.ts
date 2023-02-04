import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "./Database"

export async function removeAll(db: Database, prefix: string): Promise<void> {
  await fs.promises.rm(resolve(db.path, prefix), {
    force: true,
    recursive: true,
  })
}
