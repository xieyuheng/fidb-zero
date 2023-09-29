import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../system-resources/token"
import { Json } from "../../utils/Json"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { dataFind } from "./dataFind"

export async function handleDataFind(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleDataFind"
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "data-find:get")
    return await arrayFromAsyncIterable(
      dataFind(db, path, {
        page: query.page ? Number.parseInt(query.page) : 1,
        size: query.size ? Number.parseInt(query.size) : 50,
        properties: query.properties || {},
      }),
    )
  }

  throw new Error(
    [
      `[${who}] unhandled http request`,
      ``,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
