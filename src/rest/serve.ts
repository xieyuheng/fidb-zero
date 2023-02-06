import http from "http"
import type { Database } from "../database"

type ServeOptions = {
  hostname: string
  port: number
}

export async function serve(
  db: Database,
  options: ServeOptions,
): Promise<void> {
  const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Hello World")
  })

  server.listen(options.port, options.hostname, () => {
    console.log(`Server running at http://${options.hostname}:${options.port}/`)
  })
}
