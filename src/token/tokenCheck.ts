import { globMatch } from "../utils/globMatch"
import { Operation } from "./Operation"
import type { Token } from "./Token"

export function tokenCheck(
  token: Token,
  path: string,
  name: Operation,
): boolean {
  for (const [pattern, names] of Object.entries(token.permissions)) {
    if (globMatch(pattern, path)) {
      if (names.includes(name)) return true
    }
  }

  return false
}
