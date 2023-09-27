import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestKind } from "../../utils/node/requestKind"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"
import { PasswordLoginOptionsSchema, passwordLogin } from "./passwordLogin"

export async function handlePasswordLogin(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handlePasswordLogin"
  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)

  if (request.method === "POST") {
    const json = await requestJsonObject(request)
    const tokenName = await passwordLogin(
      db,
      path,
      PasswordLoginOptionsSchema.validate(json),
    )
    return { token: tokenName }
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
