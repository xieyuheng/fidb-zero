import type { Data } from "../data"
import type { Database } from "../database"
import type { JsonAtom } from "../utils/Json"
import { findAll } from "./findAll"

export type FindOptions = {
  properties: Record<string, JsonAtom>
}

export async function* find(
  db: Database,
  directory: string,
  options: FindOptions,
): AsyncIterable<Data> {
  for await (const data of findAll(db, directory)) {
    if (
      Object.entries(options.properties).every(
        ([key, property]) => data[key] === property,
      )
    ) {
      yield data
    }
  }
}
