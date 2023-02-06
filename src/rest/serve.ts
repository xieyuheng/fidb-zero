import Http from "node:http"
import type { Database } from "../database"

type ServeOptions = {
  hostname: string
  port: number
}
Request
export async function serve(
  db: Database,
  options: ServeOptions,
): Promise<void> {
  const server = Http.createServer((request, response) => {
    console.log(request.method)
    console.log(request.url)
    console.log(request.headers)
    console.log(request.rawHeaders)

    response.statusCode = 200
    response.setHeader("Content-Type", "text/plain")
    response.end("Hello World")
  })

  server.listen(options.port, options.hostname, () => {
    console.log(`Server running at http://${options.hostname}:${options.port}/`)
  })
}
