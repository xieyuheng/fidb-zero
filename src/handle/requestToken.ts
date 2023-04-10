import type Http from "node:http"
import { Unauthorized } from "../errors/Unauthorized"
import { requestTokenName } from "../utils/node/requestTokenName"

export async function requestToken(
  request: Http.IncomingMessage,
): Promise<string> {
  const tokenName = requestTokenName(request)

  if (tokenName === undefined) {
    throw new Unauthorized(`[requestToken] not token in authorization header`)
  }

  return tokenName
}
