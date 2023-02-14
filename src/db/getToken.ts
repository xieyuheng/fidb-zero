import type { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { Token, tokenSchema } from "../token"
import { readJson } from "../utils/readJson"
import { isValidTokenName } from "./utils/isValidTokenName"
import { resolvePath } from "./utils/resolvePath"

export async function getToken(
  db: Database,
  tokenName: string,
): Promise<Token> {
  if (!isValidTokenName(tokenName)) {
    throw new Unauthorized(`[getToken] invalid token name: ${tokenName}`)
  }

  const path = resolvePath(db, `fidb/tokens/${tokenName}`)
  const json = await readJson(path)
  return tokenSchema.validate(json)
}
