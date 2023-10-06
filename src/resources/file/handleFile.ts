import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../system-resources/token"
import { Json } from "../../utils/Json"
import { requestBytes } from "../../utils/node/requestBytes"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { fileCreate } from "./fileCreate"
import { fileDelete } from "./fileDelete"
import { fileGetOrFail } from "./fileGetOrFail"
import { filePut } from "./filePut"

export async function handleFile(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Uint8Array | void> {
  const who = "handleFile"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "HEAD") {
    await tokenAssert(db, token, path, "file:get")
    await fileGetOrFail(db, path)
    return undefined
  }

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    return await fileGetOrFail(db, path)
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:post")
    return await fileCreate(db, path, await requestBytes(request))
  }

  if (request.method === "PUT") {
    await tokenAssert(db, token, path, "file:put")
    return await filePut(db, path, await requestBytes(request))
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "file:delete")
    return await fileDelete(db, path)
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
