import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { dataCreate } from "./dataCreate"
import { dataDelete } from "./dataDelete"
import { dataGetOrFail } from "./dataGetOrFail"
import { dataPatch } from "./dataPatch"
import { dataPut } from "./dataPut"

export async function handleData(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleData"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "data:get")
    return await dataGetOrFail(db, path)
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "data:post")
    if (path === "") return

    return await dataCreate(db, path, await requestJsonObject(request))
  }

  if (request.method === "PUT") {
    await tokenAssert(db, token, path, "data:put")
    return await dataPut(db, path, await requestJsonObject(request))
  }

  if (request.method === "PATCH") {
    await tokenAssert(db, token, path, "data:patch")
    return await dataPatch(db, path, await requestJsonObject(request))
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "data:delete")
    return await dataDelete(db, path, await requestJsonObject(request))
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
