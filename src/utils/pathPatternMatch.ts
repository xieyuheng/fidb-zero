import { globMatch } from "./globMatch"
import { pathPatternParse } from "./pathPatternParse"

export function pathPatternMatch(
  pattern: string,
  path: string,
): Record<string, string> | undefined {
  const results: Record<string, string> = {}
  const exps = pathPatternParse(pattern)
  const parts = path.split("/")
  while (true) {
    const exp = exps.pop()
    const part = parts.pop()

    if (part === undefined && exp === undefined) {
      return results
    }

    if (exp === undefined) {
      return undefined
    }

    if (part === undefined) {
      if (exp.kind === "Literal" && exp.value === "**") {
        return results
      } else {
        return undefined
      }
    }

    if (exp.kind === "Literal") {
      if (!globMatch(exp.value, part)) {
        return undefined
      }
    }

    if (exp.kind === "Var") {
      results[exp.name] = part
    }
  }
}
