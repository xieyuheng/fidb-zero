import { type Database } from "../../database/index.js"
import { writeBytes } from "../../database/writeBytes.js"
import { AlreadyExists } from "../../errors/index.js"
import { fileGet } from "./fileGet.js"

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
