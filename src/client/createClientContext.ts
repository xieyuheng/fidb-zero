import { type ClientContext } from "./ClientContext.js"

export function createClientContext(url: URL, token?: string): ClientContext {
  return {
    url,
    token,
    authorization: `token ${token}`,
  }
}
