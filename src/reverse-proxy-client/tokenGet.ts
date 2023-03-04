import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"
import { isJsonObject } from "../utils/Json"
import { stringTrimEnd } from "../utils/stringTrimEnd"

export async function tokenGet(url: string): Promise<string | void> {
  const who = "reverse-proxy-client/tokenGet"

  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

  const tokens = await Db.jsonFileGet(db, `reverse-proxy-tokens.json`)

  if (tokens === undefined) {
    return
  }

  if (!isJsonObject(tokens)) {
    throw new Error(`[${who}] reverse-proxy-tokens.json is not a JsonObject`)
  }

  const key = stringTrimEnd(url, "/")
  const token = tokens[key]

  if (token === undefined) {
    return undefined
  }

  if (typeof token !== "string") {
    throw new Error(`[${who}] token not a string, ${token}`)
  }

  return token
}
