import { prepareTestDb } from "../db/prepareTestDb"
import * as Rest from "../rest"
import { findPort } from "../utils/findPort"

export async function serveTestDb(): Promise<{ url: string }> {
  const db = await prepareTestDb()

  const hostname = "127.0.0.1"
  const port = await findPort(3000)
  await Rest.serve({ db, hostname, port })

  const url = `http://${hostname}:${port}`

  return { url }
}
