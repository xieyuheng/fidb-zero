import Http from "node:http"
import { type Database } from "../../database/index.js"
import { type Json } from "../../utils/Json.js"
import { requestJsonObject } from "../../utils/node/requestJsonObject.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import { PasswordLoginOptionsSchema, passwordLogin } from "./passwordLogin.js"

export async function handlePasswordLogin(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handlePasswordLogin"
  const path = requestResolvedPath(db, request)

  if (request.method === "POST") {
    const json = await requestJsonObject(request)
    return await passwordLogin(
      db,
      path,
      PasswordLoginOptionsSchema.validate(json),
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
