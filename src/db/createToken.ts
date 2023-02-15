import type { Database } from "../database"
import type { TokenPermissions } from "../token"
import { create } from "./create"
import { randomTokenName } from "./utils/randomTokenName"

export async function createToken(
  db: Database,
  options: {
    permissions: TokenPermissions
  },
): Promise<string> {
  const tokenName = randomTokenName()

  await create(db, `fidb/tokens/${tokenName}`, {
    permissions: options.permissions,
  })

  return tokenName
}
