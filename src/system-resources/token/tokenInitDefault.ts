import { Database } from "../../database"
import { tokenCreate } from "./tokenCreate"

export async function tokenInitDefault(db: Database): Promise<string> {
  return await tokenCreate(db, "guest", {
    issuer: ".guest-token-issuer",
  })
}
