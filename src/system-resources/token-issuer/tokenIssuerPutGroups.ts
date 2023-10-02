import { TokenIssuer, TokenIssuerSchema, tokenIssuerGetOrFail } from "."
import { Database } from "../../database"
import { dataPatch } from "../../resources"

export async function tokenIssuerPutGroups(
  db: Database,
  path: string,
  groups: Array<string>,
): Promise<TokenIssuer> {
  const issuer = await tokenIssuerGetOrFail(db, path)
  const newIssuer = await dataPatch(db, path, {
    ...issuer,
    groups,
  })

  return TokenIssuerSchema.validate(newIssuer)
}
