import { resolve } from "node:path"
import { api } from "../index"
import { init } from "../init/init"
import { allOperations } from "../models/permission"
import { dataCreate } from "../resources"
import { startDatabaseServer } from "../servers/database/startDatabaseServer"
import { groupCreate } from "../system-resources/group"
import { tokenCreateRandom } from "../system-resources/token"
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
    issuerUpdatedAt: issuer["@updatedAt"],
  })

  const url = new URL(`http://${hostname}:${port}`)
  const ctx = api.createClientContext(url, tokenName)
  return { db, ctx }
}
