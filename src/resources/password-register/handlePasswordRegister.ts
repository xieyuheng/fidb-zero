import { ty } from "@xieyuheng/ty"
import Http from "node:http"
import { Database } from "../../database"
import { Json } from "../../utils/Json"
import { requestJsonObject } from "../../utils/node/requestJsonObject"
import { createData } from "../data"
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
    const schema = ty.object({
      data: ty.any(),
      options: PasswordRegisterOptionsSchema,
    })

    const { data, options } = schema.validate(await requestJsonObject(request))

    const created = await createData(db, path, data)

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
