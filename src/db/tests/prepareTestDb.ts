import { resolve } from "node:path"
import { createDatabase, Database } from "../../database"
import { formatDateTime } from "../../utils/formatDate"
import { randomHexString } from "../../utils/randomHexString"
import { slug } from "../../utils/slug"

const PREFIX = resolve(__filename, "../../../../tmp/databases/")

export async function prepareTestDb(): Promise<Database> {
  const name = slug(`${formatDateTime(Date.now())}-${randomHexString(4)}`)
  return await createDatabase({
    path: resolve(PREFIX, name),
  })
}
