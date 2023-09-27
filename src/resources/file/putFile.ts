import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { writeBuffer } from "../utils/writeBuffer"

export async function putFile(
  db: Database,
  path: string,
  buffer: Buffer,
): Promise<void> {
  await writeBuffer(db, path, buffer)
}
