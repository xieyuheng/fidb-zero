import { applyPathPattern } from "./applyPathPattern"

export function applyPathPatternRecordKeys<A>(
  record: Record<string, A>,
  properties: Record<string, string | undefined>,
): Record<string, A> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      applyPathPattern(key, properties),
      value,
    ]),
  )
}
