import { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { dataGet } from "../resources"
import { Token, TokenSchema } from "../token"
import { isValidTokenName } from "../token/isValidTokenName"

export async function tokenGetOrFail(
  db: Database,
  tokenName: string,
): Promise<Token> {
  const who = "tokenGetOrFail"

  if (!isValidTokenName(tokenName)) {
    throw new Unauthorized(`[${who}] invalid token name: ${tokenName}`)
  }

  const data = await dataGet(db, `.tokens/${tokenName}`)

  if (data === undefined) {
    throw new Unauthorized(`[${who}] invalid token name: ${tokenName}`)
  }

  return TokenSchema.validate(data)
}
