import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, tokenCheckReadable, tokenCheckWriteable } from "../token"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
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
    return {
      results: await arrayFromAsyncIterable(Db.list(db, path)),
    }
  }

  if (!tokenCheckWriteable(token, path)) {
    throw new Unauthorized(
      `[handleRequestDirectory] not permitted to write path: ${path}`,
    )
  }

  if (request.method === "POST") {
    return await Db.createDirectory(db, path)
  }

  if (request.method === "DELETE") {
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
