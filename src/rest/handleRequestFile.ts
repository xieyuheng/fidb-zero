import type Http from "node:http"
import type { Database } from "../database"
import type { Json } from "../utils/Json"

export async function handleRequestFile(
  request: Http.IncomingMessage,
  db: Database,
  path: string,
): Promise<Json | void> {
  throw new Error(
    [
      `[handleRequestFile] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
