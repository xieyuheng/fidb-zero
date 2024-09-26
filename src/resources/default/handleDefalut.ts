import Http from "node:http"
import { type Database } from "../../database/index.js"
import { isFile } from "../../database/isFile.js"
import { handleData } from "../../resources/data/handleData.js"
import { handleFile } from "../../resources/file/handleFile.js"
import { requestResolvedPath } from "../../resources/requestResolvedPath.js"
import { type Json } from "../../utils/Json.js"

export async function handleDefault(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Uint8Array | void> {
  const path = requestResolvedPath(db, request)

  if (await isFile(db, path)) {
    return await handleFile(db, request)
  } else {
    return await handleData(db, request)
  }
}
