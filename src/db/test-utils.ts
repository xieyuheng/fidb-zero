import { resolve } from "path"
import { createDatabase } from "./Database"

export const db = createDatabase({
  path: resolve(__filename, "../../../tmp/databases/test"),
})
