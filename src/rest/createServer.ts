import Http from "node:http"
import type { Database } from "../database"
import { createRequestListener } from "./createRequestListener"

export async function createServer(options: {
  db: Database
}): Promise<Http.Server> {
  return Http.createServer(createRequestListener(options))
}
