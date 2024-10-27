import ty from "@xieyuheng/ty"
import { type Data, type Database } from "../../database/index.js"
import { Unauthorized } from "../../errors/index.js"
import { dataCreate } from "../../resources/index.js"
import { passwordCreate } from "../../system-resources/password/index.js"
import { loginTokenIssuerCreate } from "../../system-resources/token-issuer/index.js"
import { type JsonObject, isJsonObject } from "../../utils/Json.js"

export type PasswordRegisterOptions = {
  data: JsonObject
  password: string
}

export const PasswordRegisterOptionsSchema = ty.object({
  data: ty.predicate(isJsonObject, {
    description: "The data should be a JSON Object.",
  }),
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
