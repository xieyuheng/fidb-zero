import { globMatch } from "../utils/globMatch"
import type { Token } from "./Token"

export function tokenCheckReadable(token: Token, path: string): boolean {
  for (const [pattern, names] of Object.entries(token.permissions)) {
    if (globMatch(pattern, path)) {
      if (names.includes("read")) return true
    }
  }

  return false
}
