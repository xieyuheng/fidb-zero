import { resolve } from "node:path"
import { createDatabase, Database } from "../../database"
import type { ReverseProxyTarget } from "./ReverseProxyTarget"

export type Context = {
  db: Database
  domain: string
  targets: Record<string, ReverseProxyTarget>
}

type ContextOptions = {
  path: string
  domain: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path, domain } = options

  const db = await createDatabase({ path: resolve(path) })

  return {
    db,
    domain,
    targets: {},
  }
}
