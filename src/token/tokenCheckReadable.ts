import { globMatch } from "../utils/globMatch"
import type { Token } from "./Token"

export function tokenCheckReadable(token: Token, path: string): boolean {
  for (const [pattern, permission] of Object.entries(token.permissions)) {
    if (globMatch(pattern, path)) {
      if (permission === "read") return true
      if (permission === "readwrite") return true
    }
  }

  return false
}
