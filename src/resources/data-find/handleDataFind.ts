import Http from "node:http"
import { type Database } from "../../database/index.js"
import { tokenAssert } from "../../system-resources/token/index.js"
import { type Json } from "../../utils/Json.js"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable.js"
import { requestQuery } from "../../utils/node/requestQuery.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import { requestToken } from "../requestToken.js"
import { dataFind } from "./dataFind.js"

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
