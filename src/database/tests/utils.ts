import { resolve } from "path"
import { Database } from "../../database"

export const db = new Database({
  path: resolve(__filename, "../../../../tmp/databases/test"),
})
