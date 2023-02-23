import type { Database } from "../database"
import type { TokenPermissionRecord } from "../token"
import { randomTokenName } from "../token/randomTokenName"
import { createData } from "./createData"

export async function createToken(
  db: Database,
  options: {
    permissionRecord: TokenPermissionRecord
  },
): Promise<string> {
  const tokenName = randomTokenName()

  await createData(db, `tokens/${tokenName}`, {
    permissionRecord: options.permissionRecord,
  })

  return tokenName
}
