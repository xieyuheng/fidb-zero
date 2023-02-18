import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { isFile } from "../db/utils/isFile"
import { normalizePath } from "../db/utils/normalizePath"
import { Unauthorized } from "../errors/Unauthorized"
import type { Json } from "../utils/Json"
import { requestQuery } from "../utils/requestQuery"
import { requestTokenName } from "../utils/requestTokenName"
import { requestURL } from "../utils/requestURL"
import { handleRequestData } from "./handleRequestData"
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

  const query = requestQuery(request)
  const kind = query.kind ? query.kind.toLowerCase() : ""

  if (kind.startsWith("file") || (await isFile(db, path))) {
    return await handleRequestFile(request, db, path, token)
  }

  if (kind.startsWith("directory")) {
    return await handleRequestDirectory(request, db, path, token)
  }

  if (kind.startsWith("data") || kind === "") {
    return await handleRequestData(request, db, path, token)
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
