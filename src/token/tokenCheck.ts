import { Database } from "../database"
import { dataGetOrFail } from "../db"
import { Operation } from "../operation"
import { globMatch } from "../utils/globMatch"
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

  for (const [pattern, operations] of Object.entries(issuer.permissions)) {
    if (globMatch(pattern, path)) {
      if (operations.includes(operation)) return true
    }
  }

  return false
}
