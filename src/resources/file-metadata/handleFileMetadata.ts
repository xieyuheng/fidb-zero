import Http from "node:http"
import { type Database } from "../../database/index.js"
import { tokenAssert } from "../../system-resources/token/index.js"
import { type Json } from "../../utils/Json.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import { requestToken } from "../requestToken.js"
import { fileMetadataGetOrFail } from "./fileMetadataGetOrFail.js"

export async function handleFileMetadata(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleFileMetadata"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    return await fileMetadataGetOrFail(db, path)
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
