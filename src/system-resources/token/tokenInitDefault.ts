import { Database } from "../../database"
import { Unauthorized } from "../../errors"
import { tokenIssuerGet } from "../token-issuer"
import { tokenCreate } from "./tokenCreate"

export async function tokenInitDefault(db: Database): Promise<string> {
  const issuer = await tokenIssuerGet(db, ".guest-token-issuer")
  if (issuer === undefined) {
    throw new Unauthorized(`[tokenInitDefault] no guest token issuer`)
  }

  return await tokenCreate(db, "guest", {
    issuer: ".guest-token-issuer",
    issuerUpdatedAt: issuer["@updatedAt"],
  })
}
