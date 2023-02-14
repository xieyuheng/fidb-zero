import type { Database } from "../database"
import { adminToken, Token } from "../token"

export async function getToken(
  db: Database,
  tokenName: string,
): Promise<Token> {
  return adminToken
}
