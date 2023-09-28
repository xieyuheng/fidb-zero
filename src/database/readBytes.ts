import fs from "node:fs"
import { Database } from "./Database"
import { resolvePath } from "./resolvePath"

export async function readBytes(
  db: Database,
  path: string,
): Promise<Uint8Array> {
  return await fs.promises.readFile(resolvePath(db, path))
}
