import micromatch from "micromatch"

export function globMatch(input: string, pattern: string): boolean {
  return micromatch.isMatch(pattern, input)
}
