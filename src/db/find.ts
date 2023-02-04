import type { JsonAtom } from "src/utils/Json"
import { all, Data, Database } from "."

export type FindOptions = {
  properties: Record<string, JsonAtom>
}

export async function* find(
  db: Database,
  prefix: string,
  options: FindOptions,
): AsyncIterable<Data> {
  for await (const data of all(db, prefix)) {
    if (
      Object.entries(options.properties).every(
        ([key, property]) => data[key] === property,
      )
    ) {
      yield data
    }
  }
}
