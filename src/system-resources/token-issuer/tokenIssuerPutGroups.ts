import { type Database } from "../../database/index.js"
import { dataPatch } from "../../resources/index.js"
import {
  type TokenIssuer,
  TokenIssuerSchema,
  tokenIssuerGetOrFail,
} from "./index.js"

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
