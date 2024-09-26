import { parsePathPattern } from "./parsePathPattern.js"

export function applyPathPattern(
  pattern: string,
  properties: Record<string, string | undefined>,
): string {
  const exps = parsePathPattern(pattern)

  const parts = exps.map((exp) => {
    switch (exp.kind) {
      case "Literal": {
        return exp.value
      }

      case "Var": {
        return properties[exp.name] || `{${exp.name}}`
      }
    }
  })

  return parts.join("/")
}
