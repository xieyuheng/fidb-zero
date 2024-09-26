import { type Database } from "../../database/index.js"
import { dataGet } from "./dataGet.js"

export async function dataHas(db: Database, path: string): Promise<boolean> {
  const data = await dataGet(db, path)
  if (data === undefined) {
    return false
  } else {
    return true
  }
}
