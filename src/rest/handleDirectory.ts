import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import type { Json } from "../utils/Json"
import { requestQuery } from "../utils/requestQuery"

export async function handleDirectory(
  request: Http.IncomingMessage,
  db: Database,
  directory: string,
): Promise<Json | void> {
  const query = requestQuery(request)

  if (request.method === "GET") {
    if (query.page !== undefined && query.size !== undefined) {
      return {
        results: await arrayFromAsyncIterable(
          Db.findPage(db, directory, {
            page: parseInt(query.page),
            size: parseInt(query.size),
            properties: query.properties || {},
          }),
        ),
      }
    }

    return {
      root: db.path,
      directory,
      directories: await arrayFromAsyncIterable(
        Db.listDirectories(db, directory),
      ),
    }
  }

  throw new Error(
    [
      `[handleDirectory] unhandled http request`,
      `  method: ${request.method}`,
      `  directory: ${directory}`,
    ].join("\n"),
  )
}
