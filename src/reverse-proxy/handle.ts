import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Json } from "../utils/Json"
import { requestKind } from "../utils/requestKind"
import type { Context } from "./Context"
import { handleDefault } from "./handleDefault"
import { handlePing } from "./handlePing"
import { handleReverseProxyTarget } from "./handleReverseProxyTarget"

export async function handle(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const kind = requestKind(request)

  if (kind.startsWith("ping")) {
    return await handlePing(ctx, request)
  }

  if (kind.startsWith("proxy-target")) {
    return await handleReverseProxyTarget(ctx, request)
  }

  return await handleDefault(ctx, request)
}
