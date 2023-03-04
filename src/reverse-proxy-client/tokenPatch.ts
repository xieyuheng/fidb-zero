import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"
import { stringTrimEnd } from "../utils/stringTrimEnd"

type Value = {
  token: string
  username: string
}

export async function tokenPatch(
  urls: Array<string>,
  value: Value,
): Promise<void> {
  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

  if (!(await Db.jsonFileGet(db, "reverse-proxy-tokens.json"))) {
    await Db.jsonFileCreate(db, "reverse-proxy-tokens.json", {})
  }

  const patch: Record<string, Value> = {}
  for (const url of urls) {
    const key = stringTrimEnd(url, "/")
    patch[key] = value
  }

  await Db.jsonFilePatch(db, "reverse-proxy-tokens.json", patch)
}
