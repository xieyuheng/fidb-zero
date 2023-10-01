import { Database } from "../../database"
import { dataGet } from "../../resources"
import { TokenIssuer, TokenIssuerSchema } from "./TokenIssuer"

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
