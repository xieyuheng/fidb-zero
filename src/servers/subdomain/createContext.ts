import { resolve } from "node:path"
import { type DatabaseConfig } from "../../database/index.js"
import { pathIsDirectory } from "../../utils/node/pathIsDirectory.js"
import { type Context } from "./Context.js"

type ContextOptions = {
  directory: string
  config: DatabaseConfig
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { directory, config } = options

  const hostname = config?.server?.hostname
  if (hostname === undefined) {
    throw new Error(
      `[subdomain/createContext] I expect server.hostname to be given.`,
    )
  }

  if (await pathIsDirectory(directory)) {
    return {
      domain: hostname,
      directory: resolve(directory),
      config,
    }
  }

  throw new Error(
    `[subdomain/createContext] I expect path to be a directory: ${directory}`,
  )
}
