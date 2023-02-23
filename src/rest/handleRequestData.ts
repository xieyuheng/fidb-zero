import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { tokenAssert } from "../token"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import type { HandleRequestOptions } from "./handleRequest"
import { requestToken } from "./requestToken"

export async function handleRequestData(
  request: Http.IncomingMessage,
  db: Database,
  options: HandleRequestOptions,
): Promise<Json | void> {
  const { path, query, kind } = options

  const token = await requestToken(request, db)

  if (request.method === "GET") {
    tokenAssert(token, path, "read")
    if (kind === "data-find") {
      return await arrayFromAsyncIterable(
        Db.findData(db, path, {
          page: query.page ? Number.parseInt(query.page) : 1,
          size: query.size ? Number.parseInt(query.size) : 50,
          properties: query.properties || {},
        }),
      )
    }

    return await Db.getOrFail(db, path)
  }

  if (request.method === "POST") {
    tokenAssert(token, path, "create")
    if (path === "") return

    return await Db.createData(db, path, await requestJsonObject(request))
  }

  if (request.method === "PUT") {
    tokenAssert(token, path, "update")
    return await Db.putData(db, path, await requestJsonObject(request))
  }

  if (request.method === "PATCH") {
    tokenAssert(token, path, "update")
    return await Db.patchData(db, path, await requestJsonObject(request))
  }

  if (request.method === "DELETE") {
    tokenAssert(token, path, "delete")
    return await Db.deleteData(db, path, await requestJsonObject(request))
  }

  throw new Error(
    [
      `[handleRequestData] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
