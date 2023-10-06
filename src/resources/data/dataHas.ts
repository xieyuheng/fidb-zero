import { Database } from "../../database"
import { dataGet } from "./dataGet"

export async function dataHas(db: Database, path: string): Promise<boolean> {
  const data = await dataGet(db, path)
  if (data === undefined) {
    return false
  } else {
    return true
  }
}
