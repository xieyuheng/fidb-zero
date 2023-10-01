import { ty } from "@xieyuheng/ty"
import { Data, Database } from "../../database"
import { Unauthorized } from "../../errors"
import { dataCreate } from "../../resources"
import { passwordCreate } from "../../system-resources/password"
import { loginTokenIssuerCreate } from "../../system-resources/token-issuer"
import { JsonObject, isJsonObject } from "../../utils/Json"

export type PasswordRegisterOptions = {
  data: JsonObject
  password: string
}

export const PasswordRegisterOptionsSchema = ty.object({
  data: ty.guard(isJsonObject),
  password: ty.string(),
})

export async function passwordRegister(
  db: Database,
  path: string,
  options: PasswordRegisterOptions,
): Promise<Data> {
  const who = "passwordRegister"
  const { password, data } = options

  const parts = path.split("/")
  if (!(parts.length === 2 && parts[0] === "users")) {
    throw new Unauthorized(`[${who}] ${path} is not login target`)
  }

  const user = parts[1]

  await loginTokenIssuerCreate(db, path, { groups: ["user"], user })
  await passwordCreate(db, path, { password })
  return await dataCreate(db, path, data)
}
