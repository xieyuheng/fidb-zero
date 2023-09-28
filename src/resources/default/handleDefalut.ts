import Http from "node:http"
import { Database } from "../../database"
import { isFile } from "../../database/isFile"
import { handleData } from "../../resources/data/handleData"
import { handleFile } from "../../resources/file/handleFile"
import { requestResolvedPath } from "../../resources/requestResolvedPath"
import { Json } from "../../utils/Json"

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
