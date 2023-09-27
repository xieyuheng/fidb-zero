import Http from "node:http"
import { handleDatabase } from "src/servers/database/handleDatabase"
import { allOperations } from "../permission"
import { createData } from "../resources"
import { createRequestListener } from "../server/createRequestListener"
import { tokenCreate } from "../token"
import { findPort } from "../utils/node/findPort"
import { serverListen } from "../utils/node/serverListen"
import { defaultPermissions } from "./defaultPermissions"
import { prepareTestDb } from "./prepareTestDb"
import { userLoginTargets } from "./userLoginTargets"

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

  await createData(db, ".config/password-register-strategy", {
    loginTargets: {
      ...userLoginTargets,
    },
  })

  await createData(db, ".config/default-token-issuer", {
    permissions: defaultPermissions,
  })

  await createData(db, ".tokens/default", {
    issuer: ".config/default-token-issuer",
  })

  await createData(db, "test-token-issuers/all-read-write", {
    permissions: {
      "**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "test-token-issuers/all-read-write",
  })

  const authorization = `token ${tokenName}`

  const url = `http://${hostname}:${port}`

  return { url, db, authorization }
}
