import { resolve } from "node:path"
import { api } from "../index.js"
import { allOperations } from "../models/permission/index.js"
import { dataCreate } from "../resources/index.js"
import { startDatabaseServer } from "../servers/database/startDatabaseServer.js"
import { initDatabase } from "../services/init/initDatabase.js"
import { groupCreate } from "../system-resources/group/index.js"
import { tokenCreateRandom } from "../system-resources/token/index.js"
import { formatDateTime } from "../utils/formatDate.js"
import { findPort } from "../utils/node/findPort.js"
import { randomHexString } from "../utils/randomHexString.js"
import { slug } from "../utils/slug.js"

const PREFIX = resolve(__dirname, "../../tmp/databases/")

export async function prepareTestServer(options: { name: string }) {
  const time = formatDateTime(Date.now())
  const basename = slug(`${time}-${randomHexString(4)}-${options.name}`)
  const directory = resolve(PREFIX, basename)
  const db = await initDatabase(directory)

  const hostname = "127.0.0.1"
  const port = await findPort()
  db.config.server = { hostname, port }

  await startDatabaseServer(db)

  await groupCreate(db, "test", {
    permissions: {
      "**": allOperations,
    },
  })

  const issuer = await dataCreate(db, ".test-token-issuer", {
    groups: ["test"],
  })

  const tokenName = await tokenCreateRandom(db, {
    issuer: ".test-token-issuer",
    issuerRevision: issuer["@revision"],
  })

  const url = new URL(`http://${hostname}:${port}`)
  const ctx = api.createClientContext(url, tokenName)
  return { db, ctx }
}
