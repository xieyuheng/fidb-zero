import { Database } from "../database"
import { groupInit } from "../system-resources/group"
import { guestTokenIssuerInit } from "../system-resources/guest-token-issuer/guestTokenIssuerInit"
import { passwordRegisterStrategyInit } from "../system-resources/password-register-strategy"
import { tokenInitDefault } from "../system-resources/token"

export async function initSystemResource(db: Database): Promise<void> {
  await groupInit(db)
  await guestTokenIssuerInit(db)
  await tokenInitDefault(db)
  await passwordRegisterStrategyInit(db)
}
