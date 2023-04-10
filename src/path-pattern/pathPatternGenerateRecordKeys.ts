import { pathPatternGenerate } from "./pathPatternGenerate"

export function pathPatternGenerateRecordKeys<A>(
  record: Record<string, A>,
  properties: Record<string, string>,
): Record<string, A> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      pathPatternGenerate(key, properties),
      value,
    ]),
  )
}
