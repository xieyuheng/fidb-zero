import { type Database } from "../../database/index.js"
import { Unauthorized } from "../../errors/index.js"
import { dataGet } from "../../resources/index.js"
import { type Token, TokenSchema } from "../token/index.js"
import { isValidTokenName } from "../token/isValidTokenName.js"

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
