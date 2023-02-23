import type { Database } from "../database"
import type { PathEntry } from "../path-entry"
import { listAll } from "./listAll"

export type ListOptions = {
  page: number // NOTE starting from 1
  size: number
}

export async function* list(
  db: Database,
  directory: string,
  options: ListOptions,
): AsyncIterable<PathEntry> {
  const offset = options.page - 1
  const start = offset * options.size
  const end = start + options.size
  let count = 0

  for await (const pathEntry of listAll(db, directory)) {
    if (count >= end) {
      break
    }

    if (start <= count && count < end) {
      yield pathEntry
    }

    count++
  }
}
