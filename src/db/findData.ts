import type { Data } from "../data"
import type { Database } from "../database"
import type { FindDataAllOptions } from "./findDataAll"
import { findDataAll } from "./findDataAll"

export type FindDataOptions = FindDataAllOptions & {
  page: number // NOTE starting from 1
  size: number
}

export async function* findData(
  db: Database,
  directory: string,
  options: FindDataOptions,
): AsyncIterable<Data> {
  const offset = options.page - 1
  const start = offset * options.size
  const end = start + options.size
  let count = 0

  for await (const data of findDataAll(db, directory, options)) {
    if (count >= end) {
      break
    }

    if (start <= count && count < end) {
      yield data
    }

    count++
  }
}
