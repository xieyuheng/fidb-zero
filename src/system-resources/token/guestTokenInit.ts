import { type Database } from "../../database/index.js"
import { Unauthorized } from "../../errors/index.js"
import { tokenIssuerGet } from "../token-issuer/index.js"
import { tokenCreate } from "./tokenCreate.js"

export async function guestTokenInit(db: Database): Promise<string> {
  const issuer = await tokenIssuerGet(db, ".guest-token-issuer")
  if (issuer === undefined) {
    throw new Unauthorized(`[guestTokenInit] no guest token issuer`)
  }

  return await tokenCreate(db, "guest", {
    issuer: ".guest-token-issuer",
    issuerRevision: issuer["@revision"],
  })
}
