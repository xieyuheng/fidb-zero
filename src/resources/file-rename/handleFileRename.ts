import { ty } from "@xieyuheng/ty"
import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import * as Db from "../../resources"
import { tokenAssert } from "../../token"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestKind } from "../../utils/node/requestKind"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"
import { requestToken } from "../requestToken"

export async function handleFileRename(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | Buffer | void> {
  const who = "handleFileRename"
  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)
  const token = await requestToken(request)

  if (request.method === "POST") {
    await tokenAssert(db, token, path, "file:delete")
    const schema = ty.object({ to: ty.string() })
    const { to } = schema.validate(await requestJsonObject(request))
    await tokenAssert(db, token, to, "file:post")
    return await Db.renameFile(db, path, to)
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
