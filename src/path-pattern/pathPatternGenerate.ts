import { pathPatternParse } from "./pathPatternParse"

export function pathPatternGenerate(
  pattern: string,
  properties: Record<string, string>,
): string {
  const exps = pathPatternParse(pattern)

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
