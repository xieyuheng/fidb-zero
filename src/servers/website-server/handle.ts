import type { Buffer } from "node:buffer"
import type Http from "node:http"
import { handlePreflight } from "../../server/handlePreflight"
import type { Json } from "../../utils/Json"
import type { Context } from "./Context"
import { handlePage } from "./handlePage"

export async function handle(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  if (ctx.cors) {
    if (request.method === "OPTIONS") {
      return handlePreflight(request, response)
    }
  }

  return await handlePage(ctx, request, response)
}
