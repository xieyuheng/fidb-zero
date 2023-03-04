import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"
import { stringTrimEnd } from "../utils/stringTrimEnd"

export async function tokenPatch(
  token: string,
  urls: Array<string>,
): Promise<void> {
  const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

  if (!(await Db.jsonFileGet(db, "reverse-proxy-tokens.json"))) {
    await Db.jsonFileCreate(db, "reverse-proxy-tokens.json", {})
  }

  const patch: Record<string, string> = {}
  for (const url of urls) {
    const key = stringTrimEnd(url, "/")
    patch[key] = token
  }

  await Db.jsonFilePatch(db, "reverse-proxy-tokens.json", patch)
}
