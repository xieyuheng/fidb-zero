import type { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, tokenSchema } from "../token"
import { get } from "./get"
import { isValidTokenName } from "./utils/isValidTokenName"

export async function getToken(
  db: Database,
  tokenName: string,
): Promise<Token> {
  if (!isValidTokenName(tokenName)) {
    throw new Unauthorized(`[getToken] invalid token name: ${tokenName}`)
  }

  return tokenSchema.validate(await get(db, `tokens/${tokenName}`))
}
