import { Database } from "../../database"
import { dataGetOrFail } from "../../resources"
import {
  PasswordRegisterStrategy,
  PasswordRegisterStrategySchema,
} from "../../system-resources/password-register-strategy"

export async function passwordRegisterStrategyGetOrFail(
  db: Database,
): Promise<PasswordRegisterStrategy> {
  return PasswordRegisterStrategySchema.validate(
    await dataGetOrFail(db, ".password-register-strategy"),
  )
}
