import type { Database } from "../database"
import type { TokenPermissions } from "../token"
import { randomTokenName } from "../token/randomTokenName"
import { create } from "./create"

export async function createToken(
  db: Database,
  options: {
    permissions: TokenPermissions
  },
): Promise<string> {
  const tokenName = randomTokenName()

  await create(db, `tokens/${tokenName}`, {
    permissions: options.permissions,
  })

  return tokenName
}
