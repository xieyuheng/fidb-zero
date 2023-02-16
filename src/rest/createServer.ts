import Http from "node:http"
import type { Database } from "../database"
import { requestListener } from "./requestListener"

export async function createServer(options: {
  db: Database
}): Promise<Http.Server> {
  return Http.createServer((request, response) =>
    requestListener(request, response, options),
  )
}
