import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"

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
