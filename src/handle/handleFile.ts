import type { Buffer } from "node:buffer"
import type Http from "node:http"
import * as Db from "../db"
import { tokenAssert } from "../token"
import type { Json } from "../utils/Json"
import { requestBuffer } from "../utils/node/requestBuffer"
import { requestKind } from "../utils/node/requestKind"
import { requestQuery } from "../utils/node/requestQuery"
import type { Context } from "./Context"
import { requestPath } from "./requestPath"
import { requestToken } from "./requestToken"

export async function handleFile(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const { db } = ctx

  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestPath(ctx, request)
  const token = await requestToken(ctx, request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    if (kind === "file-metadata") {
      return await Db.fileMetadataGetOrFail(db, path)
    }

    return await Db.fileGetOrFail(db, path)
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:post")
    return await Db.fileCreate(db, path, await requestBuffer(request))
  }

  if (request.method === "PUT") {
    await tokenAssert(db, token, path, "file:put")
    return await Db.filePut(db, path, await requestBuffer(request))
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "file:delete")
    return await Db.fileDelete(db, path)
  }

  throw new Error(
    [
      `[handleFile] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
