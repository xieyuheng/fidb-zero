import type { Buffer } from "node:buffer"
import type Http from "node:http"
import { requestKind } from "../../server/requestKind"
import type { Json } from "../../utils/Json"
import type { Context } from "./Context"
import { handlePing } from "./handlePing"

export async function handle(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  const kind = requestKind(request)

  if (kind.startsWith("ping")) {
    return await handlePing(ctx, request)
  }

  throw new Error(
    [`[handle] unhandled content-type`, `  method: ${request.method}`].join(
      "\n",
    ),
  )
}
