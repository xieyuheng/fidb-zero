import type { Data } from "../data"
import type { Database } from "../database"
import type { JsonAtom } from "../utils/Json"
import { listAll } from "./listAll"

type FindOptions = {
  properties: Record<string, JsonAtom>
}

export async function* findAll(
  db: Database,
  prefix: string,
  options: FindOptions,
): AsyncIterable<Data> {
  for await (const data of listAll(db, prefix)) {
    if (
      Object.entries(options.properties).every(
        ([key, property]) => data[key] === property,
      )
    ) {
      yield data
    }
  }
}
