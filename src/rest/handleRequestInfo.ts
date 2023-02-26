import type Http from "node:http"
import type { Json } from "../utils/Json"
import type { Context } from "./handleRequest"

export async function handleRequestInfo(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const { db } = ctx

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
