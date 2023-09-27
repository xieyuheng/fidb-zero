import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { writeBuffer } from "../../database/writeBuffer"
import { NotFound } from "../../errors"
import { Json } from "../../utils/Json"
import { getFile } from "./getFile"

export async function putJsonFile(
  db: Database,
  path: string,
  json: Json,
): Promise<void> {
  const gotten = await getFile(db, path)
  if (gotten === undefined) {
    throw new NotFound(`[putJsonFile] not found, path ${path}`)
  }

  await writeBuffer(db, path, Buffer.from(JSON.stringify(json)))
}
