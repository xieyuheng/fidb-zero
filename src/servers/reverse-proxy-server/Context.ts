import type { Database } from "../../database"
import type { ReverseProxyTarget } from "./ReverseProxyTarget"

export type Context = {
  db: Database
  targets: Record<string, ReverseProxyTarget>
}
