import Http from "node:http"
import { Database } from "../database"
import { Json } from "../utils/Json"
import { handleDataFind } from "./data-find/handleDataFind"
import { handleData } from "./data/handleData"
import { handleDefault } from "./default/handleDefalut"
import { handleDirectory } from "./directory/handleDirectory"
import { handleFileMetadata } from "./file-metadata/handleFileMetadata"
import { handleFileRename } from "./file-rename/handleFileRename"
import { handleFile } from "./file/handleFile"
import { handleInfo } from "./info/handleInfo"
import { handlePasswordLogin } from "./password-login/handlePasswordLogin"
import { handlePasswordRegister } from "./password-register/handlePasswordRegister"
import { handlePing } from "./ping/handlePing"

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
