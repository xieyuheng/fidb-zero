import * as Db from "../../db"
import { prepareTestDb } from "../../db/tests/prepareTestDb"
import * as Rest from "../../rest"
import type { TokenPermissions } from "../../token"
import { findPort } from "../../utils/findPort"
import { serverListen } from "../../utils/serverListen"

type Options = {
  name: string
  permissions?: TokenPermissions
}

export async function prepareTestServer(options: Options) {
  const db = await prepareTestDb(options)

  const server = await Rest.createServer({ db })

  const hostname = "127.0.0.1"
  const port = await findPort(3000)

  await serverListen(server, { port, hostname })

  console.log({
    message: `[prepareTestServer] start`,
    url: `http://${hostname}:${port}`,
    db,
  })

  const permissions = options.permissions || {
    "**": "readwrite",
  }

  const tokenName = await Db.createToken(db, { permissions })

  const authorization = `token ${tokenName}`

  const url = `http://${hostname}:${port}`

  return { url, authorization }
}
