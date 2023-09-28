import { ClientContext } from "./ClientContext"

export function createClientContext(url: URL, token?: string): ClientContext {
  return {
    url,
    token,
    authorization: `token ${token}`,
  }
}
