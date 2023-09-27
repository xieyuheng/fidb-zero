import { ty } from "@xieyuheng/ty"
import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { renameFile } from "../file/renameFile"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"

export async function handleFileRename(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const who = "handleFileRename"
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:delete")
    const schema = ty.object({ to: ty.string() })
    const { to } = schema.validate(await requestJsonObject(request))
    await tokenAssert(db, token, to, "file:post")
    return await renameFile(db, path, to)
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
