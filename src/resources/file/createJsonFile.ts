import { Database } from "../../database"
import { writeBuffer } from "../../database/writeBuffer"
import { AlreadyExists } from "../../errors"
import { Json } from "../../utils/Json"
import { getFile } from "./getFile"

export async function createJsonFile(
  db: Database,
  path: string,
  json: Json,
): Promise<void> {
  const gotten = await getFile(db, path)
  if (gotten !== undefined) {
    throw new AlreadyExists(`[createJsonFile] already exists, @path: ${path}`)
  }

  await writeBuffer(db, path, Buffer.from(JSON.stringify(json)))
}
