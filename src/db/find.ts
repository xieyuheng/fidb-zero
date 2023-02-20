import type { Data } from "../data"
import type { Database } from "../database"
import type { FindOptions } from "./findAll"
import { findAll } from "./findAll"

export type FindPageOptions = FindOptions & {
  page: number // NOTE starting from 1
  size: number
}

export async function* find(
  db: Database,
  directory: string,
  options: FindPageOptions,
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
