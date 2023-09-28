import { Database } from "../../database"
import { writeBuffer } from "../../database/writeBuffer"
import { AlreadyExists } from "../../errors"
import { Json } from "../../utils/Json"
import { fileGet } from "./fileGet"

export async function jsonFileCreate(
  db: Database,
  path: string,
  json: Json,
): Promise<void> {
  const gotten = await fileGet(db, path)
  if (gotten !== undefined) {
    throw new AlreadyExists(`[jsonFileCreate] already exists, @path: ${path}`)
  }

  await writeBuffer(db, path, Buffer.from(JSON.stringify(json)))
}
