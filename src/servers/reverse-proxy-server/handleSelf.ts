import type { Buffer } from "node:buffer"
import type Http from "node:http"
import { handlePreflight } from "../../server/handlePreflight"
import { requestKind } from "../../server/requestKind"
import type { Json } from "../../utils/Json"
import type { Context } from "./Context"
import { handlePing } from "./handlePing"
import { handleReverseProxyTarget } from "./handleReverseProxyTarget"

export async function handleSelf(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  const kind = requestKind(request)

  if (kind.startsWith("ping")) {
    return await handlePing(ctx, request)
  }

  if (kind.startsWith("reverse-proxy-target")) {
    return await handleReverseProxyTarget(ctx, request)
  }

  throw new Error(
    [
      `[handleSelf] unhandled content-type`,
      `  method: ${request.method}`,
      `  kind: ${kind}`,
    ].join("\n"),
  )
}
