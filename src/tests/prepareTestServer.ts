import { resolve } from "node:path"
import { api } from "../index"
import { init } from "../init/init"
import { allOperations } from "../permission"
import { dataCreate } from "../resources"
import { startDatabaseServer } from "../servers/database/startDatabaseServer"
import { tokenCreate } from "../system-resources/token"
import { formatDateTime } from "../utils/formatDate"
import { findPort } from "../utils/node/findPort"
import { randomHexString } from "../utils/randomHexString"
import { slug } from "../utils/slug"

const PREFIX = resolve(__dirname, "../../tmp/databases/")

export async function prepareTestServer(options: { name: string }) {
  const time = formatDateTime(Date.now())
  const basename = slug(`${time}-${randomHexString(4)}-${options.name}`)
  const directory = resolve(PREFIX, basename)
  const db = await init(directory)

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
