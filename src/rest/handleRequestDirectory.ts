import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, tokenCheckReadable, tokenCheckWriteable } from "../token"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import { requestQuery } from "../utils/requestQuery"

export async function handleRequestDirectory(
  request: Http.IncomingMessage,
  db: Database,
  path: string,
  token: Token,
): Promise<Json | void> {
  const query = requestQuery(request)
  const kind = query.kind ? query.kind.toLowerCase() : ""

  if (!tokenCheckReadable(token, path)) {
    throw new Unauthorized(
      `[handleRequestDirectory] not permitted to read path: ${path}`,
    )
  }

  if (request.method === "GET") {
    if (kind === "list") {
      return {
        results: await arrayFromAsyncIterable(Db.list(db, path)),
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

  if (!tokenCheckWriteable(token, path)) {
    throw new Unauthorized(
      `[handleRequestDirectory] not permitted to write path: ${path}`,
    )
  }

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
      `[handleRequestDirectory] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
