import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"

export async function handleInfo(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  if (request.method === "GET") {
    return {
      db: {
        config: db.config
          ? {
              name: db.config.name,
              description: db.config.description || null,
            }
          : null,
      },
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
