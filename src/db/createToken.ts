import type { Database } from "../database"
import type { TokenPermissions } from "../token"
import { writeJson } from "../utils/writeJson"
import { randomTokenName } from "./utils/randomTokenName"
import { resolvePath } from "./utils/resolvePath"

export async function createToken(
  db: Database,
  options: {
    permissions: TokenPermissions
  },
): Promise<string> {
  const tokenName = randomTokenName()

  const token = {
    permissions: options.permissions,
  }

  const path = resolvePath(db, `fidb/tokens/${tokenName}`)
  await writeJson(path, token)
  return tokenName
}
