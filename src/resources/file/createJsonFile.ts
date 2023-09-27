import { Database } from "../../database"
import { AlreadyExists } from "../../errors"
import { Json } from "../../utils/Json"
import { writeBuffer } from "../utils/writeBuffer"
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
