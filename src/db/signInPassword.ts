import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import type { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { passwordSchema } from "../password"
import { passwordCheck } from "../utils/password"
import { createToken } from "./createToken"
import { findDataAll } from "./findDataAll"

export type SignInPasswordOptions = {
  password: string
}

export const signInPasswordOptionsSchema = ty.object({
  password: ty.string(),
})

export async function signInPassword(
  db: Database,
  directory: string,
  options: SignInPasswordOptions,
): Promise<string> {
  for await (const data of findDataAll(db, join(directory, "passwords"), {
    properties: {},
  })) {
    const password = passwordSchema.validate(data)
    if (await passwordCheck(options.password, password.hash)) {
      const pattern = join(directory, "**")
      const tokenName = await createToken(db, {
        permissionRecord: {
          [pattern]: password.permissions,
        },
      })

      return tokenName
    }
  }

  throw new Unauthorized(
    `[signInPassword] invalid password for directory: ${directory}`,
  )
}
