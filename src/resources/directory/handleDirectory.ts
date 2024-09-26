import Http from "node:http"
import { type Database } from "../../database/index.js"
import { tokenAssert } from "../../system-resources/token/index.js"
import { type Json } from "../../utils/Json.js"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable.js"
import { requestQuery } from "../../utils/node/requestQuery.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import { requestToken } from "../requestToken.js"
import { directoryCreate } from "./directoryCreate.js"
import { directoryDelete } from "./directoryDelete.js"
import { directoryGet } from "./directoryGet.js"

export async function handleDirectory(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleDirectory"
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "GET") {
    await tokenAssert(db, token, path, "directory:get")

    return await arrayFromAsyncIterable(
      directoryGet(db, path, {
        page: query.page ? Number.parseInt(query.page) : 1,
        size: query.size ? Number.parseInt(query.size) : 50,
        recursive: query.hasOwnProperty("recursive"),
      }),
    )
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "directory:post")
    return await directoryCreate(db, path)
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "directory:delete")
    if (path === "") return

    return await directoryDelete(db, path)
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
