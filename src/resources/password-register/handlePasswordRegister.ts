import { ty } from "@xieyuheng/ty"
import Http from "node:http"
import * as Db from ".."
import { Database } from "../../database"
import { passwordRegister, PasswordRegisterOptionsSchema } from "../../password"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { requestKind } from "../../utils/node/requestKind"
import { requestQuery } from "../../utils/node/requestQuery"
import { requestResolvedPath } from "../requestResolvedPath"

export async function handlePasswordRegister(
  db: Database,
  request: Http.IncomingMessage,
): Promise<Json | void> {
  const who = "handlePasswordRegister"
  const kind = requestKind(request)
  const query = requestQuery(request)
  const path = requestResolvedPath(db, request)

  if (request.method === "POST") {
    const schema = ty.object({
      data: ty.any(),
      options: PasswordRegisterOptionsSchema,
    })

    const { data, options } = schema.validate(await requestJsonObject(request))

    const created = await Db.createData(db, path, data)

    await passwordRegister(db, created["@path"], {
      memo: options.memo,
      password: options.password,
    })

    return created
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
