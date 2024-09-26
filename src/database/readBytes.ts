import fs from "node:fs"
import { type Database } from "./Database.js"
import { resolvePath } from "./resolvePath.js"

export async function readBytes(
  db: Database,
  path: string,
): Promise<Uint8Array> {
  return await fs.promises.readFile(resolvePath(db, path))
}
