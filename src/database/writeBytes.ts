import fs from "node:fs"
import { dirname } from "node:path"
import { Database } from "./Database"
import { resolvePath } from "./resolvePath"

export async function writeBytes(
  db: Database,
  path: string,
  bytes: Uint8Array,
): Promise<void> {
  await fs.promises.mkdir(dirname(resolvePath(db, path)), { recursive: true })
  await fs.promises.writeFile(resolvePath(db, path), bytes)
}
