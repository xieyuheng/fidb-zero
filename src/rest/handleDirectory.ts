import type Http from "node:http"
import type { Data } from "../data"
import type { Database } from "../database"

export async function handleDirectory(
  request: Http.IncomingMessage,
  db: Database,
  id: string,
): Promise<Data | void> {
  //
}
