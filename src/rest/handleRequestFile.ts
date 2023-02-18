import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { tokenCheckReadable, tokenCheckWriteable } from "../token"
import type { Json } from "../utils/Json"
import { requestBuffer } from "../utils/requestBuffer"
import type { HandleRequestOptions } from "./handleRequest"

export async function handleRequestFile(
  request: Http.IncomingMessage,
  db: Database,
  options: HandleRequestOptions,
): Promise<Json | Buffer | void> {
  const { path, token } = options

  if (!tokenCheckReadable(token, path)) {
    throw new Unauthorized(
      `[handleRequestFile] not permitted to read path: ${path}`,
    )
  }

  if (request.method === "GET") {
    return await Db.getFileOrFail(db, path)
  }

  if (!tokenCheckWriteable(token, path)) {
    throw new Unauthorized(
      `[handleRequestFile] not permitted to write path: ${path}`,
    )
  }

  if (request.method === "POST") {
    return await Db.createFile(db, path, await requestBuffer(request))
  }

  if (request.method === "PUT") {
    return await Db.putFile(db, path, await requestBuffer(request))
  }

  if (request.method === "DELETE") {
    return await Db.deleteFile(db, path)
  }

  throw new Error(
    [
      `[handleRequestFile] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
