import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { PasswordSchema } from "../password"
import { getDataOrFail } from "../resources"
import { tokenCreate } from "../token/tokenCreate"
import { passwordCheck } from "../utils/node/password"

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
): Promise<string> {
  const who = "passwordLogin"

  const password = PasswordSchema.validate(
    await getDataOrFail(db, join(directory, ".password")),
  )

  if (await passwordCheck(options.password, password.hash)) {
    return await tokenCreate(db, {
      issuer: join(directory, ".login-token-issuer"),
    })
  }

  throw new Unauthorized(
    `[${who}] invalid password for directory: ${directory}`,
  )
}
