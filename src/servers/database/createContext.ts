import { loadDatabase } from "../../database"
import { Context } from "./Context"

export async function createContext(options: {
  path: string
}): Promise<Context> {
  const { path } = options

  const db = await loadDatabase({ path })

  return { db }
}
