import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestBuffer } from "../../utils/node/requestBuffer"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { createFile } from "./createFile"
import { deleteFile } from "./deleteFile"
import { getFileOrFail } from "./getFileOrFail"
import { putFile } from "./putFile"

export async function handleFile(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const who = "handleFile"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    return await getFileOrFail(db, path)
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:post")
    return await createFile(db, path, await requestBuffer(request))
  }

  if (request.method === "PUT") {
    await tokenAssert(db, token, path, "file:put")
    return await putFile(db, path, await requestBuffer(request))
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "file:delete")
    return await deleteFile(db, path)
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
