import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import type { Context } from "./Context"
import { handleRequestPing } from "./handleRequestPing"

export async function handleRequest(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const kind = requestKind(request)

  if (kind.startsWith("ping")) {
    return await handleRequestPing(ctx, request)
  }

  // if (kind.startsWith("proxy-target")) {
  //   return await handleRequestProxyTarget(ctx, request)
  // }

  throw new Error(
    [
      `[handleRequest] unhandled content-type`,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
