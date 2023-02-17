import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, tokenCheckReadable } from "../token"
import type { Json } from "../utils/Json"
import { requestBuffer } from "../utils/requestBuffer"

export async function handleRequestFile(
  request: Http.IncomingMessage,
  db: Database,
  path: string,
  token: Token,
): Promise<Json | Buffer | void> {
  if (!tokenCheckReadable(token, path)) {
    throw new Unauthorized(
      `[handleRequestFile] not permitted to read path: ${path}`,
    )
  }

  if (request.method === "GET") {
    return await Db.getFileOrFail(db, path)
  }

  if (request.method === "PUT") {
    return await Db.putFile(db, path, await requestBuffer(request))
  }

  throw new Error(
    [
      `[handleRequestFile] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
