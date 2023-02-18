import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, tokenCheckReadable, tokenCheckWriteable } from "../token"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import { requestQuery } from "../utils/requestQuery"

export async function handleRequestData(
  request: Http.IncomingMessage,
  db: Database,
  path: string,
  token: Token,
): Promise<Json | void> {
  const query = requestQuery(request)

  if (!tokenCheckReadable(token, path)) {
    throw new Unauthorized(
      `[handleRequestData] not permitted to read path: ${path}`,
    )
  }

  if (request.method === "GET") {
    return await Db.getOrFail(db, path)
  }

  if (!tokenCheckWriteable(token, path)) {
    throw new Unauthorized(
      `[handleRequestData] not permitted to write path: ${path}`,
    )
  }

  if (request.method === "POST") {
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
    return await Db.delete(db, path, await requestJsonObject(request))
  }

  throw new Error(
    [
      `[handleRequestData] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
