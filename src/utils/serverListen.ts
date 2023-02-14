import type Http from "node:http"

export type ServerListenOptions = {
  hostname: string
  port: number
}

export function serverListen(
  server: Http.Server,
  options: ServerListenOptions,
): Promise<void> {
  return new Promise((resolve, reject) => {
    server.listen(options, () => {
      resolve()
    })

    server.on("error", (error) => {
      reject(error)
    })
  })
}
