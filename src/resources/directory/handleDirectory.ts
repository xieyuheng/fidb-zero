import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"
import { createDirectory } from "./createDirectory"
import { deleteDirectory } from "./deleteDirectory"
import { listDirectory } from "./listDirectory"

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
      listDirectory(db, path, {
        page: query.page ? Number.parseInt(query.page) : 1,
        size: query.size ? Number.parseInt(query.size) : 15,
        recursive: query.hasOwnProperty("recursive"),
      }),
    )
  }

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "directory:post")
    return await createDirectory(db, path)
  }

  if (request.method === "DELETE") {
    await tokenAssert(db, token, path, "directory:delete")
    if (path === "") return

    return await deleteDirectory(db, path)
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
