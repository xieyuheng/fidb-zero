import { ty } from "@xieyuheng/ty"
import Http from "node:http"
import { Database } from "../../database"
import * as Db from "../../db"
import {
  passwordLogin,
  PasswordLoginOptionsSchema,
  passwordRegister,
  PasswordRegisterOptionsSchema,
} from "../../password"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestKind } from "../../utils/node/requestKind"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "./requestResolvedPath"

export async function handlePassword(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)

  if (request.method === "POST") {
    if (kind === "password-register") {
      const schema = ty.object({
        data: ty.any(),
        options: PasswordRegisterOptionsSchema,
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
      const tokenName = await passwordLogin(
        db,
        path,
        PasswordLoginOptionsSchema.validate(json),
      )
      return { token: tokenName }
    }
  }

  throw new Error(
    [
      `[handlePassword] unhandled http request`,
      ``,
      `  method: ${request.method}`,
      `  path: ${path}`,
    ].join("\n"),
  )
}
