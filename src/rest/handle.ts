import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { normalizePath } from "../db/utils/normalizePath"
import { adminToken, tokenCheckReadable, tokenCheckWriteable } from "../token"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import { requestQuery } from "../utils/requestQuery"
import { requestURL } from "../utils/requestURL"

export async function handle(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | void> {
  const url = requestURL(request)
  const path = normalizePath(db, decodeURIComponent(url.pathname.slice(1)))
  const query = requestQuery(request)
  const kind = query.kind ? query.kind.toLowerCase() : ""

  const token = adminToken

  tokenCheckReadable(token, path)

  if (request.method === "GET") {
    if (kind === "list") {
      return {
        directories: await arrayFromAsyncIterable(Db.listDirectories(db, path)),
      }
    }

    if (kind === "find") {
      return {
        results: await arrayFromAsyncIterable(
          Db.findPage(db, path, {
            page: query.page ? Number.parseInt(query.page) : 1,
            size: query.size ? Number.parseInt(query.size) : 50,
            properties: query.properties || {},
          }),
        ),
      }
    }

    return await Db.getOrFail(db, path)
  }

  tokenCheckWriteable(token, path)

  if (request.method === "POST") {
    if (kind === "directory") {
      return await Db.createDirectory(db, path)
    }

    if (path === "") return

    return await Db.create(db, path, await requestJsonObject(request))
  }

  if (request.method === "PUT") {
    return await Db.put(db, path, await requestJsonObject(request))
  }

  if (request.method === "PATCH") {
    return await Db.patch(db, path, await requestJsonObject(request))
  }

  if (request.method === "DELETE") {
    if (kind === "directory") {
      if (path === "") return

      return await Db.deleteDirectory(db, path)
    }

    return await Db.delete(db, path, await requestJsonObject(request))
  }

  throw new Error(
    [
      `[handle] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
