import fs from "node:fs"
import { join, resolve } from "node:path"
import { loadDatabase } from "../database"
import { formatDateTime } from "../utils/formatDate"
import { randomHexString } from "../utils/randomHexString"
import { slug } from "../utils/slug"

const PREFIX = resolve(__filename, "../../../tmp/databases/")

export async function prepareTestDb(options: { name: string }) {
  const file = slug(
    `${formatDateTime(Date.now())}-${randomHexString(4)}-${options.name}`,
  )

  const directory = resolve(PREFIX, file)

  await fs.promises.mkdir(directory, { recursive: true })

  await fs.promises.writeFile(
    join(directory, "database.json"),
    JSON.stringify({
      name: "test",
      description: "test database",
    }),
  )

  const db = await loadDatabase({ directory })

  return { db }
}
