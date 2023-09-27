import { Database } from "../../database"
import { AlreadyExists } from "../../errors"
import { Json } from "../../utils/Json"
import { writeBuffer } from "../utils/writeBuffer"
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
