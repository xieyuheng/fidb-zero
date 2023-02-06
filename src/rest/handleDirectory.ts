import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"

export async function handleDirectory(
  request: Http.IncomingMessage,
  db: Database,
  directory: string,
): Promise<Json | void> {
  if (request.method === "GET") {
    return await arrayFromAsyncIterable(Db.listDirectories(db, directory))
  }

  throw new Error(
    [
      `[handleDirectory] unhandled http request`,
      `  method: ${request.method}`,
      `  directory: ${directory}`,
    ].join("\n"),
  )
}
