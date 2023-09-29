import { ty } from "@xieyuheng/ty"
import { Database } from "../../database"
import { Unauthorized } from "../../errors/Unauthorized"
import { passwordGetOrFail } from "../../system-resources/password"
import { loginTokenCreate } from "../../system-resources/token"
import { passwordCheck } from "../../utils/node/password"

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
