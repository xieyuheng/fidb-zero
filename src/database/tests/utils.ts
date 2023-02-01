import { resolve } from "std/path/mod.ts"
import { Database } from "../../database/index.ts"

const filename = new URL(import.meta.url).pathname

export const db = new Database({
  path: resolve(filename, "../../../../tests/databases/test"),
})
