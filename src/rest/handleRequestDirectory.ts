import type Http from "node:http"
import * as Db from "../db"
import { tokenAssert } from "../token"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import { requestQuery } from "../utils/requestQuery"
import type { Context } from "./handleRequest"
import { requestPath } from "./requestPath"
import { requestToken } from "./requestToken"

export async function handleRequestDirectory(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const { db } = ctx

  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestPath(ctx, request)
  const token = await requestToken(ctx, request)

  if (request.method === "GET") {
    tokenAssert(token, path, "read")
    return await arrayFromAsyncIterable(
      Db.listDirectory(db, path, {
        page: query.page ? Number.parseInt(query.page) : 1,
        size: query.size ? Number.parseInt(query.size) : 15,
      }),
    )
  }

  if (request.method === "POST") {
    tokenAssert(token, path, "create")
    return await Db.createDirectory(db, path)
  }

  if (request.method === "DELETE") {
    tokenAssert(token, path, "delete")
    if (path === "") return

    return await Db.deleteDirectory(db, path)
  }

  throw new Error(
    [
      `[handleRequestDirectory] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
