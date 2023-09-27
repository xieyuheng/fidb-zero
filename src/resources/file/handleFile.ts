import { ty } from "@xieyuheng/ty"
import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import * as Db from "../../resources"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestBuffer } from "../../utils/node/requestBuffer"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestKind } from "../../utils/node/requestKind"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"

export async function handleFile(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const who = "handleFile"
  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "file:get")
    return await Db.getFileOrFail(db, path)
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:post")
    return await Db.createFile(db, path, await requestBuffer(request))
  }

  if (request.method === "PUT") {
    await tokenAssert(db, token, path, "file:put")
    return await Db.putFile(db, path, await requestBuffer(request))
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "file:delete")
    return await Db.deleteFile(db, path)
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