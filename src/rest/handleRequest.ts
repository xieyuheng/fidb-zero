import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import { handleRequestData } from "./handleRequestData"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"
import { handleRequestPassword } from "./handleRequestPassword"
import { requestPath } from "./requestPath"

export async function handleRequest(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | Buffer | void> {
  const kind = requestKind(request)

  if (kind.startsWith("file")) {
    return await handleRequestFile(request, db)
  }

  if (kind.startsWith("directory")) {
    return await handleRequestDirectory(request, db)
  }

  if (kind.startsWith("data")) {
    return await handleRequestData(request, db)
  }

  if (kind.startsWith("password")) {
    return await handleRequestPassword(request, db)
  }

  throw new Error(
    [
      `[handleRequest] unhandled content-type`,
      `  method: ${request.method}`,
      `  path: ${requestPath(request, db)}`,
      `  content-type: ${request.headers["content-type"]}`,
    ].join("\n"),
  )
}
