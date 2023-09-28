import { Database } from "../../database"
import { writeBytes } from "../../database/writeBytes"
import { AlreadyExists } from "../../errors"
import { fileGet } from "./fileGet"

export async function fileCreate(
  db: Database,
  path: string,
  bytes: Uint8Array,
): Promise<void> {
  const who = "fileCreate"

  const gotten = await fileGet(db, path)
  if (gotten !== undefined) {
    throw new AlreadyExists(`[${who}] already exists, path: ${path}`)
  }

  await writeBytes(db, path, bytes)
}
