import type { Data } from "../data"
import type { Database } from "../database"
import type { FindAllDataOptions } from "./findAllData"
import { findAllData } from "./findAllData"

export type FindDataOptions = FindAllDataOptions & {
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

  for await (const data of findAllData(db, directory, options)) {
    if (count >= end) {
      break
    }

    if (start <= count && count < end) {
      yield data
    }

    count++
  }
}
