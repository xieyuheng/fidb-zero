import Http from "node:http"
import { type Database } from "../../database/index.js"
import { type Json } from "../../utils/Json.js"

export async function handlePing(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  if (request.method === "GET") {
    return "pong"
  }

  throw new Error(
    [
      `[handlePing] unhandled http request`,
      ``,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
