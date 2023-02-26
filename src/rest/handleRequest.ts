import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Database } from "../database"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import { handleRequestData } from "./handleRequestData"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"
import { handleRequestInfo } from "./handleRequestInfo"
import { handleRequestPassword } from "./handleRequestPassword"
import { handleRequestPing } from "./handleRequestPing"
import { requestPath } from "./requestPath"

export type Context = {
  db: Database
}

export async function handleRequest(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const kind = requestKind(request)

  if (kind.startsWith("file")) {
    return await handleRequestFile(request, ctx.db)
  }

  if (kind.startsWith("directory")) {
    return await handleRequestDirectory(request, ctx.db)
  }

  if (kind.startsWith("data")) {
    return await handleRequestData(request, ctx.db)
  }

  if (kind.startsWith("password")) {
    return await handleRequestPassword(request, ctx.db)
  }

  if (kind.startsWith("info")) {
    return await handleRequestInfo(request, ctx.db)
  }

  if (kind.startsWith("ping")) {
    return await handleRequestPing(request, ctx.db)
  }

  throw new Error(
    [
      `[handleRequest] unhandled content-type`,
      `  method: ${request.method}`,
      `  path: ${requestPath(request, ctx.db)}`,
      `  content-type: ${request.headers["content-type"]}`,
    ].join("\n"),
  )
}
