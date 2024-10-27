import ty from "@xieyuheng/ty"
import { type Database } from "../../database/index.js"
import { Unauthorized } from "../../errors/Unauthorized.js"
import { passwordGetOrFail } from "../../system-resources/password/index.js"
import { loginTokenCreate } from "../../system-resources/token/index.js"
import { passwordCheck } from "../../utils/node/password.js"

export type PasswordLoginOptions = {
  password: string
}

export const PasswordLoginOptionsSchema = ty.object({
  password: ty.string(),
})

export async function passwordLogin(
  db: Database,
  path: string,
  options: PasswordLoginOptions,
): Promise<{ token: string }> {
  const who = "passwordLogin"

  const password = await passwordGetOrFail(db, path)
  if (await passwordCheck(options.password, password.hash)) {
    const token = await loginTokenCreate(db, path)
    return { token }
  }

  throw new Unauthorized(`[${who}] invalid password for data file: ${path}`)
}
