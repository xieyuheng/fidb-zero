import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"
import { stringTrimEnd } from "../utils/stringTrimEnd"

type Value = {
  username: string
}

export async function loggedInPatch(url: string, value: Value): Promise<void> {
  const path = "reverse-proxy/logged-in.json"

  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

  if (!(await Db.jsonFileGet(db, path))) {
    await Db.jsonFileCreate(db, path, {})
  }

  const key = stringTrimEnd(url, "/")
  await Db.jsonFilePatch(db, path, {
    [key]: value,
  })
}
