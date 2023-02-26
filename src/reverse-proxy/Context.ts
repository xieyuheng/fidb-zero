import type { ProxyTarget } from "./ProxyTarget"

export type Context = {
  proxyTargets: Record<string, ProxyTarget>
}
