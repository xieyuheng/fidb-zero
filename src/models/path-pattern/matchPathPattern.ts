import { globMatch } from "../../utils/globMatch"
import { parsePathPattern } from "./parsePathPattern"

export function matchPathPattern(
  pattern: string,
  path: string,
): Record<string, string> | undefined {
  const results: Record<string, string> = {}

  const exps = parsePathPattern(pattern)
  const parts = path.split("/")

  while (true) {
    const exp = exps.shift()
    const part = parts.shift()

    if (part === undefined && exp === undefined) {
      return results
    }

    if (exp === undefined) {
      return undefined
    }

    if (exp.kind === "Literal" && exp.value === "**" && exps.length === 0) {
      return results
    }

    if (part === undefined) {
      return undefined
    }

    if (exp.kind === "Literal") {
      if (!globMatch(exp.value, part)) {
        return undefined
      }
    }

    if (exp.kind === "Var") {
      if (results[exp.name] === undefined) {
        results[exp.name] = part
      } else if (results[exp.name] !== part) {
        return undefined
      }
    }
  }
}
