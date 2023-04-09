import type Http from "node:http"
import * as Db from "../db"
import { tokenAssert } from "../token"
import type { Json } from "../utils/Json"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { requestJsonObject } from "../utils/node/requestJsonObject"
import { requestKind } from "../utils/node/requestKind"
import { requestQuery } from "../utils/node/requestQuery"
import type { Context } from "./Context"
import { assertNotSystemPath } from "./assertNotSystemPath"
import { requestPath } from "./requestPath"
import { requestToken } from "./requestToken"

export async function handleData(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const { db } = ctx

  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestPath(ctx, request)
  const token = await requestToken(ctx, request)

  assertNotSystemPath(path, { who: kind })

  if (request.method === "GET") {
    if (kind === "data-find") {
      tokenAssert(token, path, "data-find:get")
      return await arrayFromAsyncIterable(
        Db.dataFind(db, path, {
          page: query.page ? Number.parseInt(query.page) : 1,
          size: query.size ? Number.parseInt(query.size) : 50,
          properties: query.properties || {},
        }),
      )
    }

    tokenAssert(token, path, "data:get")
    return await Db.dataGetOrFail(db, path)
  }

  if (request.method === "POST") {
    tokenAssert(token, path, "data:post")
    if (path === "") return

    return await Db.dataCreate(db, path, await requestJsonObject(request))
  }

  if (request.method === "PUT") {
    tokenAssert(token, path, "data:put")
    return await Db.dataPut(db, path, await requestJsonObject(request))
  }

  if (request.method === "PATCH") {
    tokenAssert(token, path, "data:patch")
    return await Db.dataPatch(db, path, await requestJsonObject(request))
  }

  if (request.method === "DELETE") {
    tokenAssert(token, path, "data:delete")
    return await Db.dataDelete(db, path, await requestJsonObject(request))
  }

  throw new Error(
    [
      `[handleData] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
