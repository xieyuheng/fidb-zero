import Http from "node:http"
import { type Database } from "../../database/index.js"
import { type Json } from "../../utils/Json.js"
import { requestJsonObject } from "../../utils/node/requestJsonObject.js"
import { requestResolvedPath } from "../requestResolvedPath.js"
import {
  PasswordRegisterOptionsSchema,
  passwordRegister,
} from "./passwordRegister.js"

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
