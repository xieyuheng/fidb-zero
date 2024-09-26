import { type Database } from "../../database/index.js"
import { Unauthorized } from "../../errors/index.js"
import { tokenIssuerGet } from "../token-issuer/index.js"
import { tokenCreateRandom } from "../token/index.js"

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
    issuerRevision: issuer["@revision"],
  })
}
