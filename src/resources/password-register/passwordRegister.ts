import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import { Data, Database } from "../../database"
import { Unauthorized } from "../../errors"
import { applyPathPatternRecordKeys } from "../../path-pattern/applyPathPatternRecordKeys"
import { matchPathPattern } from "../../path-pattern/matchPathPattern"
import { dataCreate, dataGetOrFail } from "../../resources"
import { JsonObject, isJsonObject } from "../../utils/Json"
import { passwordHash } from "../../utils/node/password"
import { PasswordRegisterStrategySchema } from "./PasswordRegisterStrategy"

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
    await dataGetOrFail(db, ".config/password-register-strategy"),
  )

  for (const [pattern, tokenIssuer] of Object.entries(strategy.loginTargets)) {
    const results = matchPathPattern(pattern, path)
    if (results !== undefined) {
      const permissions = applyPathPatternRecordKeys(
        tokenIssuer.permissions,
        results,
      )

      await dataCreate(db, join(path, ".login-token-issuer"), {
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
