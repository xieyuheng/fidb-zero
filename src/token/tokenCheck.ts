import { Database } from "../database"
import { dataGetOrFail } from "../db"
import { Operation } from "../permission"
import { matchPermissionRecord } from "../permission/matchPermissionRecord"
import { tokenGetOrFail } from "./tokenGetOrFail"
import { TokenIssuerSchema } from "./TokenIssuer"

export async function tokenCheck(
  db: Database,
  tokenName: string,
  path: string,
  operation: Operation,
): Promise<boolean> {
  const token = await tokenGetOrFail(db, tokenName)

  const issuer = TokenIssuerSchema.validate(
    await dataGetOrFail(db, token.issuer),
  )

  return matchPermissionRecord(issuer.permissions, path, operation)
}
