import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { getFileMetadataOrFail } from "./getFileMetadataOrFail"

export async function handleFileMetadata(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const who = "handleFileMetadata"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    return await getFileMetadataOrFail(db, path)
  }

  throw new Error(
    [
      `[${who}] unhandled http request`,
      ``,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
