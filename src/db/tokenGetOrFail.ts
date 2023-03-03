import type { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, TokenSchema } from "../token"
import { isValidTokenName } from "../token/isValidTokenName"
import { dataGet } from "./dataGet"

export async function tokenGetOrFail(
  db: Database,
  tokenName: string,
): Promise<Token> {
  if (!isValidTokenName(tokenName)) {
    throw new Unauthorized(`[getTokenOrFail] invalid token name: ${tokenName}`)
  }

  return TokenSchema.validate(await dataGet(db, `tokens/${tokenName}`))
}