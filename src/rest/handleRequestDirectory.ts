import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { tokenCheckReadable, tokenCheckWriteable } from "../token"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import { requestQuery } from "../utils/requestQuery"
import { requestTokenName } from "../utils/requestTokenName"

export async function handleRequestDirectory(
  request: Http.IncomingMessage,
  db: Database,
  path: string,
): Promise<Json | void> {
  const query = requestQuery(request)
  const kind = query.kind ? query.kind.toLowerCase() : ""

  const tokenName = requestTokenName(request)
  if (tokenName === undefined) {
    throw new Unauthorized(`[handle] not token in authorization header`)
  }

  const token = await Db.getToken(db, tokenName)

  if (!tokenCheckReadable(token, path)) {
    throw new Unauthorized(`[handle] not permitted to read path: ${path}`)
  }

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

  if (!tokenCheckWriteable(token, path)) {
    throw new Unauthorized(`[handle] not permitted to write path: ${path}`)
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
