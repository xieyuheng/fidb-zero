import { Database } from "../../database"
import { PathEntry } from "./PathEntry"
import { directoryListAll } from "./directoryListAll"

export type DirectoryListOptions = {
  page?: number // NOTE starting from 1
  size?: number
  recursive?: boolean
}

export async function* directoryList(
  db: Database,
  directory: string,
  options: DirectoryListOptions,
): AsyncIterable<PathEntry> {
  const page = options.page || 1
  const size = options.size || 50

  const offset = page - 1
  const start = offset * size
  const end = start + size
  let count = 0

  for await (const pathEntry of directoryListAll(db, directory, {
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
