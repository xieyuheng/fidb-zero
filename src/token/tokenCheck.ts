import { Database } from "../database"
import { Operation } from "../operation"
import { globMatch } from "../utils/globMatch"
import { tokenGetOrFail } from "./tokenGetOrFail"

export async function tokenCheck(
  db: Database,
  tokenName: string,
  path: string,
  operation: Operation,
): Promise<boolean> {
  const token = await tokenGetOrFail(db, tokenName)

  for (const [pattern, operations] of Object.entries(token.permissions)) {
    if (globMatch(pattern, path)) {
      if (operations.includes(operation)) return true
    }
  }

  return false
}
