export type Database = { path: string }

export function createDatabase(options: Database): Database {
  const { path } = options

  return { path }
}
