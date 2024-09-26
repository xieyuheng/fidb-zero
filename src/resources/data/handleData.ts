import Http from "node:http"
import { type Database } from "../../database/index.js"
import { tokenAssert } from "../../system-resources/token/index.js"
import { type Json } from "../../utils/Json.js"
import { requestJsonObject } from "../../utils/node/requestJsonObject.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import { requestToken } from "../requestToken.js"
import { dataCreate } from "./dataCreate.js"
import { dataDelete } from "./dataDelete.js"
import { dataGetOrFail } from "./dataGetOrFail.js"
import { dataPatch } from "./dataPatch.js"
import { dataPut } from "./dataPut.js"

export async function handleData(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleData"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "HEAD") {
    await tokenAssert(db, token, path, "data:get")
    await dataGetOrFail(db, path)
    return undefined
  }

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
