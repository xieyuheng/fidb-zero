import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import type { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { PasswordSchema } from "../password"
import { passwordCheck } from "../utils/node/password"
import { dataFindAll } from "./dataFindAll"
import { tokenCreate } from "./tokenCreate"

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

  for await (const data of dataFindAll(db, join(directory, "passwords"), {
    properties: {},
  })) {
    const password = PasswordSchema.validate(data)
    if (await passwordCheck(options.password, password.hash)) {
      const pattern = join(directory, "**")
      const tokenName = await tokenCreate(db, {
        permissionRecord: {
          [pattern]: password.permissions,
        },
      })

      return tokenName
    }
  }

  throw new Unauthorized(
    `[${who}] invalid password for directory: ${directory}`,
  )
}
