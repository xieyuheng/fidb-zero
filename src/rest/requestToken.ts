import type Http from "node:http"
import type { Database } from "../database"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import type { Token } from "../token"
import { requestTokenName } from "../utils/requestTokenName"

export async function requestToken(
  request: Http.IncomingMessage,
  db: Database,
): Promise<Token> {
  const tokenName = requestTokenName(request)
  if (tokenName === undefined) {
    throw new Unauthorized(`[requestToken] not token in authorization header`)
  }

  return await Db.getTokenOrFail(db, tokenName)
}
