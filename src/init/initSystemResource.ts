import { Database } from "../database"
import { guestTokenIssuerInit } from "../system-resources/default-token-issuer/guestTokenIssuerInit"
import { passwordRegisterStrategyInit } from "../system-resources/password-register-strategy"
import { tokenInitDefault } from "../system-resources/token"

export async function initSystemResource(db: Database): Promise<void> {
  await guestTokenIssuerInit(db)
  await tokenInitDefault(db)
  await passwordRegisterStrategyInit(db)
}
