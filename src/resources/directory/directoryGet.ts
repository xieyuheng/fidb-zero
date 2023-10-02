import { Database } from "../../database"
import { PathEntry } from "./PathEntry"
import { directoryGetAll } from "./directoryGetAll"

export type DirectoryGetOptions = {
  page?: number // NOTE starting from 1
  size?: number
  recursive?: boolean
}

export async function* directoryGet(
  db: Database,
  directory: string,
  options: DirectoryGetOptions,
): AsyncIterable<PathEntry> {
  const page = options.page || 1
  const size = options.size || 50

  const offset = page - 1
  const start = offset * size
  const end = start + size
  let count = 0

  for await (const pathEntry of directoryGetAll(db, directory, {
    recursive: options.recursive,
  })) {
    const parts = pathEntry.path.split("/")
    if (parts.some((part) => part.startsWith("."))) {
      continue
    }

    if (count >= end) {
      break
    }

    if (start <= count && count < end) {
      yield pathEntry
    }

    count++
  }
}
