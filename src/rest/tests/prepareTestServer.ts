import * as Db from "../../db"
import { prepareTestDb } from "../../db/tests/prepareTestDb"
import * as Rest from "../../rest"
import { findPort } from "../../utils/findPort"
import { serverListen } from "../../utils/serverListen"

export async function prepareTestServer(testName: string) {
  const db = await prepareTestDb(testName)

  const server = await Rest.createServer({ db })

  const hostname = "127.0.0.1"
  const port = await findPort(3000)

  await serverListen(server, { port, hostname })

  console.log({
    message: `[prepareTestServer] start`,
    url: `http://${hostname}:${port}`,
    db,
  })

  const tokenName = await Db.createToken(db, {
    permissions: {
      "**": "readwrite",
    },
  })

  const authorization = `token ${tokenName}`

  const url = `http://${hostname}:${port}`

  return { url, authorization }
}
