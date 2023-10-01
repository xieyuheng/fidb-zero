import { Database } from "../../database"
import { dataCreate } from "../../resources"

export async function guestTokenIssuerInit(db: Database): Promise<void> {
  await dataCreate(db, ".guest-token-issuer", {
    groups: ["guest"],
  })
}
