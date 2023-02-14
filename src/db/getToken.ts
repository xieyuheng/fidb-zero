import type { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { adminToken, Token } from "../token"

function isValidTokenName(tokenName: string): boolean {
  return !tokenName.includes(".") && !tokenName.includes("/")
}

export async function getToken(
  db: Database,
  tokenName: string,
): Promise<Token> {
  if (!isValidTokenName(tokenName)) {
    throw new Unauthorized(`[getToken] not validate token name: ${tokenName}`)
  }

  const token = adminToken

  return token
}
