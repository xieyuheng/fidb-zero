import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"
import { isJsonObject } from "../utils/Json"
import { stringTrimEnd } from "../utils/stringTrimEnd"

export async function tokenGet(url: string): Promise<
  | {
      token: string
      username: string
    }
  | undefined
> {
  const who = "reverse-proxy-client/tokenGet"

  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

  const tokens = await Db.jsonFileGet(db, "reverse-proxy-tokens.json")

  if (tokens === undefined) {
    return undefined
  }

  if (!isJsonObject(tokens)) {
    throw new Error(`[${who}] reverse-proxy-tokens.json is not a JsonObject`)
  }

  const key = stringTrimEnd(url, "/")
  const value = tokens[key]

  if (value === undefined) {
    return undefined
  }

  return value as {
    token: string
    username: string
  }
}
