import { resolve } from "node:path"
import { DatabaseConfig } from "../../database"
import { Context } from "./Context"

export async function createContext(options: {
  domain: string
  directory: string
  config: DatabaseConfig
}): Promise<Context> {
  const { domain, directory, config } = options

  return {
    domain,
    directory: resolve(directory),
    config,
  }
}
