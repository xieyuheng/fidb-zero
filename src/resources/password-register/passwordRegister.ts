import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import { Data, Database } from "../../database"
import { Unauthorized } from "../../errors"
import {
  applyPathPatternRecordKeys,
  matchPathPattern,
} from "../../models/path-pattern"
import { dataCreate, dataGetOrFail } from "../../resources"
import { loginTokenIssuerCreate } from "../../system-resources/login-token-issuer"
import { PasswordRegisterStrategySchema } from "../../system-resources/password-register-strategy"
import { JsonObject, isJsonObject } from "../../utils/Json"
import { passwordHash } from "../../utils/node/password"

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

  const strategy = PasswordRegisterStrategySchema.validate(
    await dataGetOrFail(db, ".password-register-strategy"),
  )

  for (const [pattern, tokenIssuer] of Object.entries(strategy.loginTargets)) {
    const results = matchPathPattern(pattern, path)
    if (results !== undefined) {
      const permissions = applyPathPatternRecordKeys(
        tokenIssuer.permissions,
        results,
      )

      await loginTokenIssuerCreate(db, path, {
        permissions,
      })

      await dataCreate(db, join(path, ".password"), {
        hash: await passwordHash(password),
        memo: memo,
      })

      return await dataCreate(db, path, data)
    }
  }

  throw new Unauthorized(`[${who}] ${path} is not login target`)
}
