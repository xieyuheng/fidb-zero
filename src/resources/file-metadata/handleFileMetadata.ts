import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { fileGetMetadataOrFail } from "./fileGetMetadataOrFail"

export async function handleFileMetadata(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleFileMetadata"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    return await fileGetMetadataOrFail(db, path)
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
