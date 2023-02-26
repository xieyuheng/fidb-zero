import { ty } from "@xieyuheng/ty"
import type Http from "node:http"
import { dirname } from "node:path"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import type { Json } from "../utils/Json"
import { requestJsonObject } from "../utils/requestJsonObject"
import { requestKind } from "../utils/requestKind"
import { requestQuery } from "../utils/requestQuery"
import type { Context } from "./Context"
import { requestPath } from "./requestPath"

export async function handleRequestPassword(
  ctx: Context,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const { db } = ctx

  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestPath(ctx, request)

  if (request.method === "POST") {
    if (kind === "password-sign-up") {
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

      const config = await Db.getAuthDirectoryConfig(db, dirname(path))

      if (config === undefined) {
        throw new Unauthorized(
          `[handleRequestPassword] path is not an auth directory: ${path}`,
        )
      }

      const created = await Db.createData(db, path, data)

      await Db.signUpPassword(db, created["@path"], {
        memo: options.memo,
        password: options.password,
        permissions: config.permissions,
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
