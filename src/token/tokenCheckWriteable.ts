import { globMatch } from "../utils/globMatch"
import type { Token } from "./Token"

export function tokenCheckWriteable(token: Token, path: string): boolean {
  for (const [pattern, names] of Object.entries(token.permissions)) {
    if (globMatch(pattern, path)) {
      if (names.includes("update")) return true
    }
  }

  return false
}
