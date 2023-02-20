import type { Data } from "../data"
import type { Database } from "../database"
import type { FindAllOptions } from "./findAll"
import { findAll } from "./findAll"

export type FindOptions = FindAllOptions & {
  page: number // NOTE starting from 1
  size: number
}

export async function* find(
  db: Database,
  directory: string,
  options: FindOptions,
): AsyncIterable<Data> {
  const offset = options.page - 1
  const start = offset * options.size
  const end = start + options.size
  let count = 0

  for await (const data of findAll(db, directory, options)) {
    if (count >= end) {
      break
    }

    if (start <= count && count < end) {
      yield data
    }

    count++
  }
}
