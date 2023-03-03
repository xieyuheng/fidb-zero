import type { Buffer } from "node:buffer"
import type Http from "node:http"
import { handlePreflight } from "../../server/handlePreflight"
import { requestKind } from "../../server/requestKind"
import { requestURL } from "../../server/requestURL"
import type { Json } from "../../utils/Json"
import type { Context } from "./Context"
import { handleDispatch } from "./handleDispatch"
import { handlePing } from "./handlePing"
import { handleReverseProxyTarget } from "./handleReverseProxyTarget"

export async function handle(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  const url = requestURL(request)

  if (url.hostname === ctx.domain) {
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
  }

  return await handleDispatch(ctx, request, response)
}
