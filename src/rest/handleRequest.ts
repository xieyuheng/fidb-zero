import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { isDirectory } from "../db/utils/isDirectory"
import { isFile } from "../db/utils/isFile"
import { normalizePath } from "../db/utils/normalizePath"
import { Unauthorized } from "../errors/Unauthorized"
import type { Json } from "../utils/Json"
import { requestTokenName } from "../utils/requestTokenName"
import { requestURL } from "../utils/requestURL"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"

export async function handleRequest(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | Buffer | void> {
  const url = requestURL(request)
  const path = normalizePath(db, decodeURIComponent(url.pathname.slice(1)))

  const tokenName = requestTokenName(request)
  if (tokenName === undefined) {
    throw new Unauthorized(`[handleRequest] not token in authorization header`)
  }

  const token = await Db.getToken(db, tokenName)

  if (
    request.headers["content-type"] === undefined ||
    request.headers["content-type"] === "application/json"
  ) {
    return await handleRequestDirectory(request, db, path, token)
  }

  if (await isDirectory(db, path)) {
    return await handleRequestDirectory(request, db, path, token)
  }

  if (
    request.headers["content-type"] === "text/plain" ||
    request.headers["content-type"] === "application/octet-stream"
  ) {
    return await handleRequestFile(request, db, path, token)
  }

  if (await isFile(db, path)) {
    return await handleRequestFile(request, db, path, token)
  }

  throw new Error(
    [
      `[handleRequest] unhandled content-type`,
      `  method: ${request.method}`,
      `  path: ${path}`,
      `  content-type: ${request.headers["content-type"]}`,
    ].join("\n"),
  )
}
