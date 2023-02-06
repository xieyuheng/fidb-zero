import type { Database } from "./Database"

export async function createDatabase(options: Database): Promise<Database> {
  const { path } = options

  return { path }
}
