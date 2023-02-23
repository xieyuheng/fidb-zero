import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import { requestQuery } from "../utils/requestQuery"
import { handleRequestData } from "./handleRequestData"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"
import { handleRequestPassword } from "./handleRequestPassword"
import { requestPath } from "./requestPath"

export type HandleRequestOptions = {
  path: string
  kind: string
  query: Record<string, any>
}

export async function handleRequest(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | Buffer | void> {
  const path = requestPath(request, db)
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
