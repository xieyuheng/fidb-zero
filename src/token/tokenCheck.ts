import { Database } from "../database"
import { Operation } from "../operation"
import { globMatch } from "../utils/globMatch"
import type { Token } from "./Token"

export async function tokenCheck(
  db: Database,
  token: Token,
  path: string,
  operation: Operation,
): Promise<boolean> {
  for (const [pattern, operations] of Object.entries(token.permissions)) {
    if (globMatch(pattern, path)) {
      if (operations.includes(operation)) return true
    }
  }

  return false
}
