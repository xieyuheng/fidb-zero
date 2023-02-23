import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { tokenAssert } from "../token"
import type { Json } from "../utils/Json"
import { requestBuffer } from "../utils/requestBuffer"
import type { HandleRequestOptions } from "./handleRequest"

export async function handleRequestFile(
  request: Http.IncomingMessage,
  db: Database,
  options: HandleRequestOptions,
): Promise<Json | Buffer | void> {
  const { path, token, kind } = options

  if (request.method === "GET") {
    tokenAssert(token, path, "read")
    if (kind === "file-metadata") {
      return await Db.getFileMetadataOrFail(db, path)
    }

    return await Db.getFileOrFail(db, path)
  }

  if (request.method === "POST") {
    tokenAssert(token, path, "create")
    return await Db.createFile(db, path, await requestBuffer(request))
  }

  if (request.method === "PUT") {
    tokenAssert(token, path, "update")
    return await Db.putFile(db, path, await requestBuffer(request))
  }

  if (request.method === "DELETE") {
    tokenAssert(token, path, "delete")
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
