import Http from "node:http"
import { defaultPermissions } from "../../../password/defaultPermissions"
import { userLoginTargets } from "../../../password/userLoginTargets"
import { allOperations } from "../../../permission"
import * as Db from "../../../resources"
import { createRequestListener } from "../../../server/createRequestListener"
import { tokenCreate } from "../../../token"
import { findPort } from "../../../utils/node/findPort"
import { serverListen } from "../../../utils/node/serverListen"
import { handle } from "../handle"
import { prepareTestDb } from "./prepareTestDb"

export async function prepareTestServer(options: { name: string }) {
  const { db } = await prepareTestDb(options)

  const requestListener = createRequestListener({
    ctx: db,
    handle,
  })

  const server = Http.createServer()

  server.on("request", requestListener)

  const hostname = "127.0.0.1"
  const port = await findPort(5108)

  await serverListen(server, { port, hostname })

  await Db.dataCreate(db, ".config/password-register-strategy", {
    loginTargets: {
      ...userLoginTargets,
    },
  })

  await Db.dataCreate(db, ".config/default-token-issuer", {
    permissions: defaultPermissions,
  })

  await Db.dataCreate(db, ".tokens/default", {
    issuer: ".config/default-token-issuer",
  })

  await Db.dataCreate(db, "test-token-issuers/all-read-write", {
    permissions: {
      "**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "test-token-issuers/all-read-write",
  })

  const authorization = `token ${tokenName}`

  const url = `http://${hostname}:${port}`

  return { url, db, authorization, server }
}
