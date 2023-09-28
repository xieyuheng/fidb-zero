import { Database } from "../../database"
import { writeBytes } from "../../database/writeBytes"

export async function filePut(
  db: Database,
  path: string,
  bytes: Uint8Array,
): Promise<void> {
  await writeBytes(db, path, bytes)
}
