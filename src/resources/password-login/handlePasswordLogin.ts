import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestResolvedPath } from "../requestResolvedPath"
import { PasswordLoginOptionsSchema, passwordLogin } from "./passwordLogin"

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
