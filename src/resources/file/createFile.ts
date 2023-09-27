import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { AlreadyExists } from "../../errors"
import { writeBuffer } from "../utils/writeBuffer"
import { getFile } from "./getFile"

export async function createFile(
  db: Database,
  path: string,
  buffer: Buffer,
): Promise<void> {
  const who = "createFile"

  const gotten = await getFile(db, path)
  if (gotten !== undefined) {
    throw new AlreadyExists(`[${who}] already exists, path: ${path}`)
  }

  await writeBuffer(db, path, buffer)
}
