import type { Database } from "../database"
import type { JsonAtom } from "../utils/Json"
import { all } from "./all"
import type { Data } from "./Data"

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
