import { ty } from "@xieyuheng/ty"
import { Data, Database } from "../../database"
import { Unauthorized } from "../../errors"
import {
  applyPathPatternRecordKeys,
  matchPathPattern,
} from "../../models/path-pattern"
import { dataCreate } from "../../resources"
import { passwordCreate } from "../../system-resources/password"
import { passwordRegisterStrategyGetOrFail } from "../../system-resources/password-register-strategy"
import { tokenIssuerCreate } from "../../system-resources/token-issuer"
import { JsonObject, isJsonObject } from "../../utils/Json"

export type PasswordRegisterOptions = {
  data: JsonObject
  memo?: string
  password: string
}

export const PasswordRegisterOptionsSchema = ty.object({
  data: ty.guard(isJsonObject),
  memo: ty.optional(ty.string()),
  password: ty.string(),
})

export async function passwordRegister(
  db: Database,
  path: string,
  options: PasswordRegisterOptions,
): Promise<Data> {
  const who = "passwordRegister"

  const { password, memo, data } = options

  const strategy = await passwordRegisterStrategyGetOrFail(db)

  for (const [pattern, tokenIssuer] of Object.entries(strategy.loginTargets)) {
    const results = matchPathPattern(pattern, path)
    if (results !== undefined) {
      const permissions = applyPathPatternRecordKeys(
        tokenIssuer.permissions,
        results,
      )

      await tokenIssuerCreate(db, path, { permissions })
      await passwordCreate(db, path, { password, memo })
      return await dataCreate(db, path, data)
    }
  }

  throw new Unauthorized(`[${who}] ${path} is not login target`)
}
