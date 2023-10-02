import { Database } from "../../database"
import { dataGetOrFail } from "../../resources"
import { TokenIssuer, TokenIssuerSchema } from "./TokenIssuer"

export async function tokenIssuerGetOrFail(
  db: Database,
  path: string,
): Promise<TokenIssuer> {
  const data = await dataGetOrFail(db, path)

  return TokenIssuerSchema.validate(data)
}
