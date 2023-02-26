import type Http from "node:http"
import type { Database } from "../database"
import type { Json } from "../utils/Json"

export async function handleRequestInfo(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Json | void> {
  if (request.method === "GET") {
    return {
      config: db.config
        ? {
            name: db.config.name,
            description: db.config.description || null,
            authDirectories: db.config.authDirectories || null,
          }
        : null,
    }
  }

  throw new Error(
    [
      `[handleRequestInfo] unhandled http request`,
      `  method: ${request.method}`,
    ].join("\n"),
  )
}
