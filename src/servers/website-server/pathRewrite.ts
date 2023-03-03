import { globMatch } from "../../utils/globMatch"

export function pathRewrite(
  path: string,
  rewrites: Record<string, string>,
): string {
  for (const [pattern, target] of Object.entries(rewrites)) {
    if (globMatch(pattern, path)) {
      return target
    }
  }

  return path
}
