import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import { Database } from "../database"
import { Unauthorized } from "../errors"
import { applyPathPatternRecordKeys } from "../path-pattern/applyPathPatternRecordKeys"
import { matchPathPattern } from "../path-pattern/matchPathPattern"
import { createData, getDataOrFail } from "../resources"
import { passwordHash } from "../utils/node/password"
import { PasswordRegisterStrategySchema } from "./PasswordRegisterStrategy"

export type PasswordRegisterOptions = {
  memo?: string
  password: string
}

export const PasswordRegisterOptionsSchema = ty.object({
  memo: ty.optional(ty.string()),
  password: ty.string(),
})

export async function passwordRegister(
  db: Database,
  directory: string,
  options: PasswordRegisterOptions,
): Promise<void> {
  const who = "passwordRegister"

  const strategy = PasswordRegisterStrategySchema.validate(
    await getDataOrFail(db, ".config/password-register-strategy"),
  )

  for (const [pattern, tokenIssuer] of Object.entries(strategy.loginTargets)) {
    const results = matchPathPattern(pattern, directory)
    if (results !== undefined) {
      const permissions = applyPathPatternRecordKeys(
        tokenIssuer.permissions,
        results,
      )

      await createData(db, join(directory, ".login-token-issuer"), {
        permissions,
      })

      await createData(db, join(directory, ".password"), {
        hash: await passwordHash(options.password),
        memo: options.memo,
      })

      return
    }
  }

  throw new Unauthorized(`[${who}] ${directory} is not login target`)
}
