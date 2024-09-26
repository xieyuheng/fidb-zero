import Http from "node:http"
import { requestTokenName } from "../utils/node/requestTokenName.js"

export async function requestToken(
  request: Http.IncomingMessage,
): Promise<string> {
  return requestTokenName(request) || "guest"
}
