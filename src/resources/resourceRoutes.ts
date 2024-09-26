import Http from "node:http"
import { type Database } from "../database/index.js"
import { type Json } from "../utils/Json.js"
import { handleDataFind } from "./data-find/handleDataFind.js"
import { handleData } from "./data/handleData.js"
import { handleDefault } from "./default/handleDefalut.js"
import { handleDirectory } from "./directory/handleDirectory.js"
import { handleFileMetadata } from "./file-metadata/handleFileMetadata.js"
import { handleFileRename } from "./file-rename/handleFileRename.js"
import { handleFile } from "./file/handleFile.js"
import { handleInfo } from "./info/handleInfo.js"
import { handlePasswordLogin } from "./password-login/handlePasswordLogin.js"
import { handlePasswordRegister } from "./password-register/handlePasswordRegister.js"
import { handlePing } from "./ping/handlePing.js"

export type ResourceHandler = (
  db: Database,
  request: Http.IncomingMessage,
) => Promise<Json | Uint8Array | void>

export const resourceRoutes: Record<string, ResourceHandler> = {
  "": handleDefault,
  ping: handlePing,
  info: handleInfo,
  data: handleData,
  "data-find": handleDataFind,
  file: handleFile,
  "file-metadata": handleFileMetadata,
  "file-rename": handleFileRename,
  directory: handleDirectory,
  "password-register": handlePasswordRegister,
  "password-login": handlePasswordLogin,
}
