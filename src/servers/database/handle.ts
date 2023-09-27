import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import * as Db from "../../resources"
import { handlePreflight } from "../../server/handlePreflight"
import { Json } from "../../utils/Json"
import { requestKind } from "../../utils/node/requestKind"
import { handleData } from "./handleData"
import { handleDirectory } from "./handleDirectory"
import { handleFile } from "./handleFile"
import { handleInfo } from "./handleInfo"
import { handlePassword } from "./handlePassword"
import { handlePing } from "./handlePing"
import { requestResolvedPath } from "./requestResolvedPath"

export async function handle(
  db: Database,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  const kind = requestKind(request)
  const path = requestResolvedPath(db, request)

  if (await Db.isFile(db, path)) {
    return await handleFile(db, request)
  }

  if (kind.startsWith("data") || kind === "") {
    return await handleData(db, request)
  }

  if (kind.startsWith("file")) {
    return await handleFile(db, request)
  }

  if (kind.startsWith("directory")) {
    return await handleDirectory(db, request)
  }

  if (kind.startsWith("password")) {
    return await handlePassword(db, request)
  }

  if (kind.startsWith("info")) {
    return await handleInfo(db, request)
  }

  if (kind.startsWith("ping")) {
    return await handlePing(db, request)
  }

  throw new Error(
    [
      `[database/handle] unhandled content-type`,
      ``,
      `  method: ${request.method}`,
      `  path: ${requestResolvedPath(db, request)}`,
    ].join("\n"),
  )
}
