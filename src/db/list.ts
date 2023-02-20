import type { Database } from "../database"
import { listAll } from "./listAll"
import type { PathEntry } from "./PathEntry"

export async function* list(
  db: Database,
  directory: string = "",
): AsyncIterable<PathEntry> {
  for await (const pathEntry of listAll(db, directory)) {
    yield pathEntry
  }
}
