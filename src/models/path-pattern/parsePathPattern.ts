export type PathPatternExp =
  | { kind: "Literal"; value: string }
  | { kind: "Var"; name: string }

export function parsePathPattern(pattern: string): Array<PathPatternExp> {
  const parts = pattern.split("/")
  return parts.map(pathPatternPartParse)
}

function pathPatternPartParse(part: string): PathPatternExp {
  if (part.startsWith("{") && part.endsWith("}")) {
    return {
      kind: "Var",
      name: part.slice(1, part.length - 1),
    }
  } else {
    return {
      kind: "Literal",
      value: part,
    }
  }
}
