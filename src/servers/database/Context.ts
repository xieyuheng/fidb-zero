import { Database, loadDatabase } from "../../database"

export type Context = {
  db: Database
}

type ContextOptions = {
  path: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path } = options

  const db = await loadDatabase({ path })

  return { db }
}
