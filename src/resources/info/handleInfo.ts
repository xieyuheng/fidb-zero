import Http from "node:http"
import { type Database } from "../../database/index.js"
import { type Json } from "../../utils/Json.js"

export async function handleInfo(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  if (request.method === "GET") {
    const { config } = db
    return {
      name: config.name || null,
      description: config.description || null,
    }
  }

  throw new Error(
    [
      `[handleInfo] unhandled http request`,
      ``,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
