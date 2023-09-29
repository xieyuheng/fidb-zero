import { Database } from "../database"
import { defaultTokenIssuerInit } from "../system-resources/default-token-issuer/defaultTokenIssuerInit"
import { passwordRegisterStrategyInit } from "../system-resources/password-register-strategy"
import { tokenInitDefault } from "../system-resources/token"

export async function initSystemResource(db: Database): Promise<void> {
  await defaultTokenIssuerInit(db)
  await tokenInitDefault(db)
  await passwordRegisterStrategyInit(db)
}
