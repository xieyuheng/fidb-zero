import { resolve } from "node:path"
import { init } from "../init/init"
import { formatDateTime } from "../utils/formatDate"
import { randomHexString } from "../utils/randomHexString"
import { slug } from "../utils/slug"

const PREFIX = resolve(__dirname, "../../tmp/databases/")

export async function prepareTestDb(options: { name: string }) {
  const time = formatDateTime(Date.now())
  const basename = slug(`${time}-${randomHexString(4)}-${options.name}`)
  const directory = resolve(PREFIX, basename)
  return await init(directory)
}
