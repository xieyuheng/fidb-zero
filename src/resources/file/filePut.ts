import { type Database } from "../../database/index.js"
import { writeBytes } from "../../database/writeBytes.js"

export async function filePut(
  db: Database,
  path: string,
  bytes: Uint8Array,
): Promise<void> {
  await writeBytes(db, path, bytes)
}
