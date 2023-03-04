import { env } from "../command-line/env"
import { createDatabase } from "../database"
import * as Db from "../db"
import { log } from "../utils/log"

type Options = {
  url: URL
  username: string
  password: string
}

export async function login(options: Options) {
  const who = "reverse-proxy-client/login"

  const { url, username, password } = options

  const response = await fetch(
    new URL(`/users/${username}?kind=password-login`, url),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    },
  )

  if (response.ok) {
    const token = await response.json()

    const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

    if (!(await Db.jsonFileGet(db, `reverse-proxy-tokens.json`))) {
      await Db.jsonFileCreate(db, `reverse-proxy-tokens.json`, {})
    }

    await Db.jsonFilePatch(db, `reverse-proxy-tokens.json`, {
      [url.toString()]: token,
    })

    log({ who, message: `token saved` })
  } else {
    log({
      who,
      kind: "Error",
      status: {
        code: response.status,
        message: response.statusText,
      },
    })
  }
}
