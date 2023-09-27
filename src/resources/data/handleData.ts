import Http from "node:http"
import { Database } from "../../database"
import * as Db from "../../resources"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestKind } from "../../utils/node/requestKind"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"

export async function handleData(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleData"
  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "data:get")
    return await Db.getDataOrFail(db, path)
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "data:post")
    if (path === "") return

    return await Db.createData(db, path, await requestJsonObject(request))
  }

  if (request.method === "PUT") {
    await tokenAssert(db, token, path, "data:put")
    return await Db.putData(db, path, await requestJsonObject(request))
  }

  if (request.method === "PATCH") {
    await tokenAssert(db, token, path, "data:patch")
    return await Db.patchData(db, path, await requestJsonObject(request))
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "data:delete")
    return await Db.deleteData(db, path, await requestJsonObject(request))
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
