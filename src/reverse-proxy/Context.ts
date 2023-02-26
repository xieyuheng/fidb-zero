import type { Database } from "../database"
import type { ProxyTarget } from "./ProxyTarget"

export type Context = {
  db: Database
  proxyTargets: Record<string, ProxyTarget>
}
