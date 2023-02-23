import type { Database } from "../database"
import type { TokenPermissions } from "../token"
import { randomTokenName } from "../token/randomTokenName"
import { createData } from "./createData"

export async function createToken(
  db: Database,
  options: {
    permissions: TokenPermissions
  },
): Promise<string> {
  const tokenName = randomTokenName()

  await createData(db, `tokens/${tokenName}`, {
    permissions: options.permissions,
  })

  return tokenName
}
