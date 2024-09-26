import { type Database } from "../../database/index.js"
import { groupInit } from "../../system-resources/group/index.js"
import { guestTokenIssuerInit } from "../../system-resources/guest-token-issuer/guestTokenIssuerInit.js"
import { guestTokenInit } from "../../system-resources/token/index.js"

export async function initSystemResource(db: Database): Promise<void> {
  await groupInit(db)
  await guestTokenIssuerInit(db)
  await guestTokenInit(db)
}
