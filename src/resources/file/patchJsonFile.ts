import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { NotFound, Unprocessable } from "../../errors"
import { JsonObject, isJsonObject } from "../../utils/Json"
import { writeBuffer } from "../utils/writeBuffer"
import { getJsonFile } from "./getJsonFile"

export async function patchJsonFile(
  db: Database,
  path: string,
  jsonObject: JsonObject,
): Promise<void> {
  const gotten = await getJsonFile(db, path)
  if (gotten === undefined) {
    throw new NotFound(`[patchJsonFile] not found, path ${path}`)
  }

  if (!isJsonObject(gotten)) {
    throw new Unprocessable(`[patchJsonFile] expect json object, path ${path}`)
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
