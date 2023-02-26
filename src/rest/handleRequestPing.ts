import type Http from "node:http"
import type { Json } from "../utils/Json"
import type { Context } from "./handleRequest"

export async function handleRequestPing(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  if (request.method === "GET") {
    return "pong"
  }

  throw new Error(
    [
      `[handleRequestPing] unhandled http request`,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
