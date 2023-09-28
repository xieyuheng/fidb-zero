import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { writeBuffer } from "../../database/writeBuffer"
import { NotFound } from "../../errors"
import { Json } from "../../utils/Json"
import { fileGet } from "./fileGet"

export async function jsonFilePut(
  db: Database,
  path: string,
  json: Json,
): Promise<void> {
  const gotten = await fileGet(db, path)
  if (gotten === undefined) {
    throw new NotFound(`[jsonFilePut] not found, path ${path}`)
  }

  await writeBuffer(db, path, Buffer.from(JSON.stringify(json)))
}
