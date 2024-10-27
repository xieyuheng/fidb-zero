import ty from "@xieyuheng/ty"
import Http from "node:http"
import { type Database } from "../../database/index.js"
import { tokenAssert } from "../../system-resources/token/index.js"
import { type Json } from "../../utils/Json.js"
import { requestJsonObject } from "../../utils/node/requestJsonObject.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import { requestToken } from "../requestToken.js"
import { fileRename } from "./fileRename.js"

export async function handleFileRename(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handleFileRename"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:delete")
    const schema = ty.object({ to: ty.string() })
    const { to } = schema.validate(await requestJsonObject(request))
    await tokenAssert(db, token, to, "file:post")
    return await fileRename(db, path, { to })
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
