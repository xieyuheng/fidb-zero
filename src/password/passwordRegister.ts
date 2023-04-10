import { ty } from "@xieyuheng/ty"
import { join } from "node:path"
import type { Database } from "../database"
import { dataGetOrFail } from "../db"
import { dataCreate } from "../db/dataCreate"
import { Unauthorized } from "../errors"
import { pathPatternGenerateRecordKeys } from "../path-pattern/pathPatternGenerateRecordKeys"
import { pathPatternMatch } from "../path-pattern/pathPatternMatch"
import { passwordHash } from "../utils/node/password"
import { PasswordRegisterStrategySchema } from "./PasswordRegisterStrategy"

export type PasswordRegisterOptions = {
  memo: string
  password: string
}

export const PasswordRegisterOptionsSchema = ty.object({
  memo: ty.string(),
  password: ty.string(),
})

export async function passwordRegister(
  db: Database,
  directory: string,
  options: PasswordRegisterOptions,
): Promise<void> {
  const who = "passwordRegister"

  const strategy = PasswordRegisterStrategySchema.validate(
    await dataGetOrFail(db, ".configs/password-register-strategy"),
  )

  for (const [pattern, tokenIssuer] of Object.entries(strategy.loginTargets)) {
    const results = pathPatternMatch(pattern, directory)
    if (results !== undefined) {
      const permissions = pathPatternGenerateRecordKeys(
        tokenIssuer.permissions,
        results,
      )

      await dataCreate(db, join(directory, ".password"), {
        hash: await passwordHash(options.password),
        memo: options.memo,
        permissions,
      })

      return
    }
  }

  throw new Unauthorized(`[${who}] ${directory} is not login target`)
}
