import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import type { Database } from "../database"
import { TokenPermission, tokenPermissionSchema } from "../token"
import { passwordHash } from "../utils/password"
import { randomHexString } from "../utils/randomHexString"
import { createData } from "./createData"

export type PasswordRegisterOptions = {
  memo: string
  password: string
  permissions: Array<TokenPermission>
}

export const PasswordRegisterOptionsSchema = ty.object({
  memo: ty.string(),
  password: ty.string(),
  permissions: ty.array(tokenPermissionSchema),
})

export async function PasswordRegister(
  db: Database,
  directory: string,
  options: PasswordRegisterOptions,
): Promise<void> {
  const id = randomHexString(10)
  await createData(db, join(directory, "passwords", id), {
    hash: await passwordHash(options.password),
    memo: options.memo,
    permissions: options.permissions,
  })
}
