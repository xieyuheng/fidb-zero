import { Database } from "../../database"
import { PathEntry } from "./PathEntry"
import { listAllDirectory } from "./listAllDirectory"

export type ListOptions = {
  page: number // NOTE starting from 1
  size: number
  recursive?: boolean
}

export async function* listDirectory(
  db: Database,
  directory: string,
  options: ListOptions,
): AsyncIterable<PathEntry> {
  const offset = options.page - 1
  const start = offset * options.size
  const end = start + options.size
  let count = 0

  for await (const pathEntry of listAllDirectory(db, directory, {
    recursive: options.recursive,
  })) {
    if (count >= end) {
      break
    }

    if (start <= count && count < end) {
      yield pathEntry
    }

    count++
  }
}
