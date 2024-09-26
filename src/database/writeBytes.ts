import fs from "node:fs"
import { dirname } from "node:path"
import { type Database } from "./Database.js"
import { resolvePath } from "./resolvePath.js"

export async function writeBytes(
  db: Database,
  path: string,
  bytes: Uint8Array,
): Promise<void> {
  await fs.promises.mkdir(dirname(resolvePath(db, path)), { recursive: true })
  await fs.promises.writeFile(resolvePath(db, path), bytes)
}
