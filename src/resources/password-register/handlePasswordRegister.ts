import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestResolvedPath } from "../requestResolvedPath"
import {
  PasswordRegisterOptionsSchema,
  passwordRegister,
} from "./passwordRegister"

export async function handlePasswordRegister(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handlePasswordRegister"
  const path = requestResolvedPath(db, request)

  if (request.method === "POST") {
    const options = PasswordRegisterOptionsSchema.validate(
      await requestJsonObject(request),
    )

    return await passwordRegister(db, path, options)
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
