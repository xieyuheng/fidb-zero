import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { writeBuffer } from "../../database/writeBuffer"
import { AlreadyExists } from "../../errors"
import { fileGet } from "./fileGet"

export async function fileCreate(
  db: Database,
  path: string,
  buffer: Buffer,
): Promise<void> {
  const who = "fileCreate"

  const gotten = await fileGet(db, path)
  if (gotten !== undefined) {
    throw new AlreadyExists(`[${who}] already exists, path: ${path}`)
  }

  await writeBuffer(db, path, buffer)
}
