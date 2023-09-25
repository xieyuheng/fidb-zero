import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"

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
