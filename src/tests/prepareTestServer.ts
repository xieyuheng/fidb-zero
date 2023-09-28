import Http from "node:http"
import { handleDatabase } from "src/servers/database/handleDatabase"
import { allOperations } from "../permission"
import { createData } from "../resources"
import { createRequestListener } from "../server/createRequestListener"
import { tokenCreate } from "../token"
import { findPort } from "../utils/node/findPort"
import { serverListen } from "../utils/node/serverListen"
import { prepareTestDb } from "./prepareTestDb"

export async function prepareTestServer(options: { name: string }) {
  const { db } = await prepareTestDb(options)

  const requestListener = createRequestListener({
    ctx: db,
    handle: handleDatabase,
  })

  const server = Http.createServer()

  server.on("request", requestListener)

  const hostname = "127.0.0.1"
  const port = await findPort(5108)

  await serverListen(server, { port, hostname })

  await createData(db, "test-token-issuers/all-read-write", {
    permissions: {
      "**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "test-token-issuers/all-read-write",
  })

  const authorization = `token ${tokenName}`

  const url = new URL(`http://${hostname}:${port}`)

  const ctx = {
    url,
    authorization,
    token: tokenName,
  }

  return { url, db, authorization, ctx }
}
