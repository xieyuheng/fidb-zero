import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import * as Db from "../db"
import {
  passwordLogin,
  PasswordLoginOptionsSchema,
  passwordRegister,
} from "../password"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/node/requestJsonObject"
import { requestKind } from "../utils/node/requestKind"
import { requestQuery } from "../utils/node/requestQuery"
import type { Context } from "./Context"
import { requestPath } from "./requestPath"

export async function handlePassword(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const { db } = ctx

  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestPath(ctx, request)

  if (request.method === "POST") {
    if (kind === "password-register") {
      const schema = ty.object({
        data: ty.any(),
        options: ty.object({
          memo: ty.string(),
          password: ty.string(),
        }),
      })

      const { data, options } = schema.validate(
        await requestJsonObject(request),
      )

      const created = await Db.dataCreate(db, path, data)

      await passwordRegister(db, created["@path"], {
        memo: options.memo,
        password: options.password,
      })

      return created
    }

    if (kind === "password-login") {
      const json = await requestJsonObject(request)
      return passwordLogin(db, path, PasswordLoginOptionsSchema.validate(json))
    }
  }

  throw new Error(
    [
      `[handlePassword] unhandled http request`,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
