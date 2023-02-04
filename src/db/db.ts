import { resolve } from "path"
import { createDatabase } from "."

export const db = createDatabase({
  path: resolve(__filename, "../../../../tmp/databases/test"),
})
