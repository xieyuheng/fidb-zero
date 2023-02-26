import type Http from "node:http"
import type { Database } from "../database"
import type { Json } from "../utils/Json"

export async function handleRequestPing(
  request: Http.IncomingMessage,
  db: Database,
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
