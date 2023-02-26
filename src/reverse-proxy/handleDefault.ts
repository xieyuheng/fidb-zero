import type { Buffer } from "node:buffer"
import type Http from "node:http"
import type { Json } from "../utils/Json"
import type { Context } from "./Context"

export async function handleDefault(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const target = Object.values(ctx.targets)[0]
  return await target.waiter.sendRequest(request)
}
