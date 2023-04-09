import Http from "node:http"
import { handle } from ".."
import { prepareTestDb } from "../../db/tests/prepareTestDb"
import { allOperations } from "../../operation"
import { createRequestListener } from "../../server/createRequestListener"
import { tokenCreate } from "../../token"
import { findPort } from "../../utils/node/findPort"
import { serverListen } from "../../utils/node/serverListen"

export async function prepareTestServer(options: { name: string }) {
  const { db } = await prepareTestDb(options)

  const requestListener = createRequestListener({
    ctx: { db },
    handle,
  })

  const server = Http.createServer()

  server.on("request", requestListener)

  const hostname = "127.0.0.1"
  const port = await findPort(3000)

  await serverListen(server, { port, hostname })

  const authorization = `token ${await tokenCreate(db, {
    permissions: {
      "**": allOperations,
    },
  })}`

  const url = `http://${hostname}:${port}`

  return { url, db, authorization, server }
}
