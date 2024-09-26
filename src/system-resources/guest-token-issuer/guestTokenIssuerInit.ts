import { type Database } from "../../database/index.js"
import { dataCreate } from "../../resources/index.js"

export async function guestTokenIssuerInit(db: Database): Promise<void> {
  await dataCreate(db, ".guest-token-issuer", {
    groups: ["guest"],
  })
}
