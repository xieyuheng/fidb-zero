import { join } from "node:path"
import type { Database } from "../database"
import type { TokenPermission } from "../token"
import { passwordHash } from "../utils/password"
import { randomHexString } from "../utils/randomHexString"
import { createData } from "./createData"

export type SignUpPasswordOptions = {
  memo: string
  password: string
  permissions: Array<TokenPermission>
}

export async function signUpPassword(
  db: Database,
  directory: string,
  options: SignUpPasswordOptions,
): Promise<void> {
  const id = randomHexString(10)
  await createData(db, join(directory, "passwords", id), {
    hash: await passwordHash(options.password),
    memo: options.memo,
    permissions: options.permissions,
  })
}
