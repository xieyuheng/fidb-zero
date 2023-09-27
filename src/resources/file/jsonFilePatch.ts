import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { NotFound, Unprocessable } from "../../errors"
import { JsonObject, isJsonObject } from "../../utils/Json"
import { writeBuffer } from "../utils/writeBuffer"
import { jsonFileGet } from "./jsonFileGet"

export async function jsonFilePatch(
  db: Database,
  path: string,
  jsonObject: JsonObject,
): Promise<void> {
  const gotten = await jsonFileGet(db, path)
  if (gotten === undefined) {
    throw new NotFound(`[jsonFilePatch] not found, path ${path}`)
  }

  if (!isJsonObject(gotten)) {
    throw new Unprocessable(`[jsonFilePatch] expect json object, path ${path}`)
  }

  await writeBuffer(
    db,
    path,
    Buffer.from(
      JSON.stringify({
        ...gotten,
        ...jsonObject,
      }),
    ),
  )
}
