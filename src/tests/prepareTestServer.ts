import { api } from "../index"
import { allOperations } from "../permission"
import { dataCreate } from "../resources"
import { startDatabaseServer } from "../servers/database/startDatabaseServer"
import { tokenCreate } from "../token"
import { findPort } from "../utils/node/findPort"
import { prepareTestDb } from "./prepareTestDb"

export async function prepareTestServer(options: { name: string }) {
  const db = await prepareTestDb(options)

  const hostname = "127.0.0.1"
  const port = await findPort(5108)
  db.config.server = { hostname, port }

  await startDatabaseServer(db)

  await dataCreate(db, "test-token-issuers/all-read-write", {
    permissions: {
      "**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "test-token-issuers/all-read-write",
  })

  const url = new URL(`http://${hostname}:${port}`)
  const ctx = api.createClientContext(url, tokenName)
  return { db, ctx }
}
