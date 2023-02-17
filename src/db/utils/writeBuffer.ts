import type { Buffer } from "node:buffer"
import fs from "node:fs"
import type { Database } from "../../database"
import { resolveDataPath } from "./resolveDataPath"

export async function writeBuffer(
  db: Database,
  path: string,
  buffer: Buffer,
): Promise<void> {
  await fs.promises.writeFile(resolveDataPath(db, path), buffer)
}
