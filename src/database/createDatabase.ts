import type { Database } from "./Database"

export function createDatabase(options: Database): Database {
  const { path } = options

  return { path }
}
