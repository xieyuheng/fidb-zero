import { Database } from "../../database"
import { Operation, matchPermissionRecord } from "../../models/permission"
import { dataGetOrFail } from "../../resources"
import { TokenIssuerSchema } from "./TokenIssuer"
import { tokenGetOrFail } from "./tokenGetOrFail"

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
