import { Buffer } from "node:buffer"
import Http from "node:http"
import { Database } from "../../database"
import * as Db from "../../resources"
import { handleDataFind } from "../../resources/data-find/handleDataFind"
import { handleData } from "../../resources/data/handleData"
import { handleDirectory } from "../../resources/directory/handleDirectory"
import { handleFileMetadata } from "../../resources/file-metadata/handleFileMetadata"
import { handleFileRename } from "../../resources/file-rename/handleFileRename"
import { handleFile } from "../../resources/file/handleFile"
import { handleInfo } from "../../resources/info/handleInfo"
import { handlePasswordLogin } from "../../resources/password-login/handlePasswordLogin"
import { handlePasswordRegister } from "../../resources/password-register/handlePasswordRegister"
import { handlePing } from "../../resources/ping/handlePing"
import { requestResolvedPath } from "../../resources/requestResolvedPath"
import { handlePreflight } from "../../server/handlePreflight"
import { Json } from "../../utils/Json"
import { requestKind } from "../../utils/node/requestKind"

export async function handleDatabase(
  db: Database,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  const who = "handleDatabase"

  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  const kind = requestKind(request)
  const path = requestResolvedPath(db, request)

  if (kind === "") {
    if (await Db.isFile(db, path)) {
      return await handleFile(db, request)
    } else {
      return await handleData(db, request)
    }
  }

  if (kind === "data") {
    return await handleData(db, request)
  }

  if (kind === "data-find") {
    return await handleDataFind(db, request)
  }

  if (kind === "file") {
    return await handleFile(db, request)
  }

  if (kind === "file-metadata") {
    return await handleFileMetadata(db, request)
  }

  if (kind === "file-rename") {
    return await handleFileRename(db, request)
  }

  if (kind === "directory") {
    return await handleDirectory(db, request)
  }

  if (kind === "password-login") {
    return await handlePasswordLogin(db, request)
  }

  if (kind === "password-register") {
    return await handlePasswordRegister(db, request)
  }

  if (kind === "info") {
    return await handleInfo(db, request)
  }

  if (kind === "ping") {
    return await handlePing(db, request)
  }

  throw new Error(
    [
      `[${who}] unhandled content-type`,
      ``,
      `  method: ${request.method}`,
      `  path: ${requestResolvedPath(db, request)}`,
    ].join("\n"),
  )
}
