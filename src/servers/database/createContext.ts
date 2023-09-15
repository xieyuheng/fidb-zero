import { DatabaseConfig } from "../../database"
import { Context } from "./Context"

export async function createContext(options: {
  directory: string
  config: DatabaseConfig
}): Promise<Context> {
  const { directory, config } = options

  const db = { directory, config }

  return { db }
}
