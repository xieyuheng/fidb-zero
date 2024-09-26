import { type Database } from "../../database/index.js"
import { dataGetOrFail } from "../../resources/index.js"
import { type TokenIssuer, TokenIssuerSchema } from "./TokenIssuer.js"

export async function tokenIssuerGetOrFail(
  db: Database,
  path: string,
): Promise<TokenIssuer> {
  const data = await dataGetOrFail(db, path)

  return TokenIssuerSchema.validate(data)
}
