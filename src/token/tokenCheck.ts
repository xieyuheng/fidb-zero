import { globMatch } from "../utils/globMatch"
import type { Token, TokenPermission } from "./Token"

export function tokenCheck(
  token: Token,
  path: string,
  name: TokenPermission,
): boolean {
  for (const [pattern, names] of Object.entries(token.permissionRecord)) {
    if (globMatch(pattern, path)) {
      if (names.includes(name)) return true
    }
  }

  return false
}
