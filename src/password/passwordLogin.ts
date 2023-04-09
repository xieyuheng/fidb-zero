import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import type { Database } from "../database"
import { dataGet } from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { PasswordSchema } from "../password"
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
    await dataGet(db, join(directory, "password")),
  )
  if (await passwordCheck(options.password, password.hash)) {
    const pattern = join(directory, "**")
    const tokenName = await tokenCreate(db, {
      permissions: {
        [pattern]: password.permissions,
      },
    })

    return tokenName
  }

  throw new Unauthorized(
    `[${who}] invalid password for directory: ${directory}`,
  )
}
