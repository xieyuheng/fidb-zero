import Http from "node:http"
import { requestURLAlwaysWithHttpProtocol } from "./requestURLAlwaysWithHttpProtocol.js"

export function requestPathname(request: Http.IncomingMessage): string {
  return requestURLAlwaysWithHttpProtocol(request).pathname
}
