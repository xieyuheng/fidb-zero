import type { Buffer } from "node:buffer"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { fileGet } from "./fileGet"
import { writeBuffer } from "./utils/writeBuffer"

export async function filePut(
  db: Database,
  path: string,
  buffer: Buffer,
): Promise<void> {
  const who = "filePut"

  const gotten = await fileGet(db, path)
  if (gotten === undefined) {
    throw new NotFound(`[${who}] not found, path ${path}`)
  }

  await writeBuffer(db, path, buffer)
}
