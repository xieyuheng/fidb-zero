import { resolve } from "node:path"
import { createDatabase, Database } from "../database"
import type { Channel } from "../reverse-proxy/Channel"

export type Context = {
  db: Database
  domain: string
  availablePorts: Array<number>
  channels: Record<string, Channel>
}

type ContextOptions = {
  path: string
  domain: string
  availablePorts: Array<number>
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path, domain, availablePorts } = options

  const db = await createDatabase({ path: resolve(path) })

  return {
    db,
    domain,
    availablePorts,
    channels: {},
  }
}
