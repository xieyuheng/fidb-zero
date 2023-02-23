import type { Buffer } from "node:buffer"
import type { Database } from "../database"
import { NotFound } from "../errors/NotFound"
import { getFile } from "./getFile"
import { writeBuffer } from "./utils/writeBuffer"

export async function putFile(
  db: Database,
  path: string,
  buffer: Buffer,
): Promise<void> {
  const gotten = await getFile(db, path)
  if (gotten === undefined) {
    throw new NotFound(`[putFile] not found, path ${path}`)
  }

  await writeBuffer(db, path, buffer)
}
