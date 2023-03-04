import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"

export async function usernameGet(): Promise<string | undefined> {
  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })
  const buffer = await Db.fileGet(db, "username")
  if (buffer === undefined) {
    return
  }

  return buffer.toString()
}
