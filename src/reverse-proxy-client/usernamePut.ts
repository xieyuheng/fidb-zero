import { Buffer } from "node:buffer"
import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"

export async function usernamePut(username: string): Promise<void> {
  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

  await Db.filePut(db, "username", Buffer.from(username))
}
