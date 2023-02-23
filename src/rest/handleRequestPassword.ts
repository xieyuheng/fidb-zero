import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import type { TokenPermission } from "../token"
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
      const schema = ty.object({
        data: ty.any(),
        options: ty.object({
          memo: ty.string(),
          password: ty.string(),
        }),
      })

      const {
        data,
        options: { memo, password },
      } = schema.validate(await requestJsonObject(request))

      const permissions: Array<TokenPermission> = []

      const created = await Db.createData(db, path, data)

      await Db.signUpPassword(db, created["@path"], {
        memo,
        password,
        permissions,
      })

      return created
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
