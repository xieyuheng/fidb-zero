import * as Db from "../../db"
import { prepareTestDb } from "../../db/tests/prepareTestDb"
import * as Rest from "../../rest"
import { findPort } from "../../utils/findPort"
import { serverListen } from "../../utils/serverListen"

type Options = {
  name: string
}

export async function prepareTestServer(options: Options) {
  const db = await prepareTestDb(options)

  const server = await Rest.createServer({ db })

  const hostname = "127.0.0.1"
  const port = await findPort(3000)

  await serverListen(server, { port, hostname })

  const authorization = `token ${await Db.createToken(db, {
    permissions: {
      "**": "readwrite",
    },
  })}`

  const url = `http://${hostname}:${port}`

  return { url, db, authorization }
}
