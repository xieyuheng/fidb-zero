import { Database } from "../../database"
import { dataCreate } from "../../resources"
import { TokenIssuerInput } from "./TokenIssuer"

export async function loginTokenIssuerCreate(
  db: Database,
  path: string,
  input: TokenIssuerInput,
): Promise<void> {
  await dataCreate(db, `${path}/.token-issuer`, input)
}
