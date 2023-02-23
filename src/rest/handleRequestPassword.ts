import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import type { HandleRequestOptions } from "./handleRequest"

export async function handleRequestPassword(
  request: Http.IncomingMessage,
  db: Database,
  options: HandleRequestOptions,
): Promise<Json | void> {
  const { path, token, kind } = options

  if (request.method === "POST") {
    if (kind === "password-sign-up") {
      return Db.signUpPassword(
        db,
        path,
        Db.signUpPasswordOptionsSchema.validate(
          await requestJsonObject(request),
        ),
      )
    }

    if (kind === "password-sign-in") {
      return Db.signInPassword(
        db,
        path,
        Db.signInPasswordOptionsSchema.validate(
          await requestJsonObject(request),
        ),
      )
    }
  }

  throw new Error(
    [
      `[handleRequestPassword] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
