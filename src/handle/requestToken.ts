import type Http from "node:http"
import { requestTokenName } from "../utils/node/requestTokenName"

export async function requestToken(
  request: Http.IncomingMessage,
): Promise<string> {
  return requestTokenName(request) || "default"
}
