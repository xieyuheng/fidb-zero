import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import { Database } from "../../database"
import { Unauthorized } from "../../errors/Unauthorized"
import { PasswordSchema, dataGetOrFail } from "../../resources"
import { loginTokenCreate } from "../../system-resources/login-token"
import { passwordCheck } from "../../utils/node/password"

export type PasswordLoginOptions = {
  password: string
}

export const PasswordLoginOptionsSchema = ty.object({
  password: ty.string(),
})

export async function passwordLogin(
  db: Database,
  directory: string,
  options: PasswordLoginOptions,
): Promise<{ token: string }> {
  const who = "passwordLogin"

  const password = PasswordSchema.validate(
    await dataGetOrFail(db, join(directory, ".password")),
  )

  if (await passwordCheck(options.password, password.hash)) {
    const token = await loginTokenCreate(db, directory)
    return { token }
  }

  throw new Unauthorized(
    `[${who}] invalid password for directory: ${directory}`,
  )
}
