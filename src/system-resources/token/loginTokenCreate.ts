import { Database } from "../../database"
import { Unauthorized } from "../../errors"
import { tokenCreateRandom } from "../token"
import { tokenIssuerGet } from "../token-issuer"

export async function loginTokenCreate(
  db: Database,
  path: string,
): Promise<string> {
  const issuer = await tokenIssuerGet(db, `${path}/.token-issuer`)
  if (issuer === undefined) {
    throw new Unauthorized(`[loginTokenCreate] no token issuer for: ${path}`)
  }

  return await tokenCreateRandom(db, {
    issuer: `${path}/.token-issuer`,
    issuerUpdatedAt: issuer["@updatedAt"],
  })
}
