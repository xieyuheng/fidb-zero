import { type Database } from "../../database/index.js"
import { dataCreate } from "../../resources/index.js"
import { type TokenIssuerInput } from "./TokenIssuer.js"

export async function loginTokenIssuerCreate(
  db: Database,
  path: string,
  input: TokenIssuerInput,
): Promise<void> {
  await dataCreate(db, `${path}/.token-issuer`, input)
}
