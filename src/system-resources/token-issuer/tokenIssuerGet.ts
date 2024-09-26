import { type Database } from "../../database/index.js"
import { dataGet } from "../../resources/index.js"
import { type TokenIssuer, TokenIssuerSchema } from "./TokenIssuer.js"

export async function tokenIssuerGet(
  db: Database,
  path: string,
): Promise<TokenIssuer | undefined> {
  const data = await dataGet(db, path)
  if (data === undefined) {
    return undefined
  }

  return TokenIssuerSchema.validate(data)
}
