import type { Buffer } from "node:buffer"
import fs from "node:fs"
import type { Database } from "../../database"
import { resolveDataPath } from "./resolveDataPath"

export async function readBuffer(db: Database, path: string): Promise<Buffer> {
  return await fs.promises.readFile(resolveDataPath(db, path))
}
