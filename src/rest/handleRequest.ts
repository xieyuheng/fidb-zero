import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import { normalizePath } from "../db/utils/normalizePath"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import { requestQuery } from "../utils/requestQuery"
import { requestURL } from "../utils/requestURL"
import { handleRequestData } from "./handleRequestData"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"
import { handleRequestPassword } from "./handleRequestPassword"

export type HandleRequestOptions = {
  path: string
  kind: string
  query: Record<string, any>
}

export async function handleRequest(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | Buffer | void> {
  const url = requestURL(request)
  const path = normalizePath(db, decodeURIComponent(url.pathname.slice(1)))

  const query = requestQuery(request)
  const kind = requestKind(request)

  const options = { path, query, kind }

  if (kind.startsWith("file")) {
    return await handleRequestFile(request, db, options)
  }

  if (kind.startsWith("directory")) {
    return await handleRequestDirectory(request, db, options)
  }

  if (kind.startsWith("data")) {
    return await handleRequestData(request, db, options)
  }

  if (kind.startsWith("password")) {
    return await handleRequestPassword(request, db, options)
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
