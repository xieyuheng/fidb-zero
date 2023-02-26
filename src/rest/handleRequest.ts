import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import type { Context } from "./Context"
import { handleRequestData } from "./handleRequestData"
import { handleRequestDirectory } from "./handleRequestDirectory"
import { handleRequestFile } from "./handleRequestFile"
import { handleRequestInfo } from "./handleRequestInfo"
import { handleRequestPassword } from "./handleRequestPassword"
import { handleRequestPing } from "./handleRequestPing"
import { requestPath } from "./requestPath"

export async function handleRequest(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const kind = requestKind(request)

  if (kind.startsWith("file")) {
    return await handleRequestFile(ctx, request)
  }

  if (kind.startsWith("directory")) {
    return await handleRequestDirectory(ctx, request)
  }

  if (kind.startsWith("data")) {
    return await handleRequestData(ctx, request)
  }

  if (kind.startsWith("password")) {
    return await handleRequestPassword(ctx, request)
  }

  if (kind.startsWith("info")) {
    return await handleRequestInfo(ctx, request)
  }

  if (kind.startsWith("ping")) {
    return await handleRequestPing(ctx, request)
  }

  throw new Error(
    [
      `[handleRequest] unhandled content-type`,
      `  method: ${request.method}`,
      `  path: ${requestPath(ctx, request)}`,
    ].join("\n"),
  )
}
