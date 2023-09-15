import fs from "node:fs"
import Http from "node:http"
import Https from "node:https"
import { RequestListener } from "../../server/RequestListener"
import { ServerOptions } from "../../server/ServerOptions"
import { serverListenWithDefault } from "../../server/serverListenWithDefault"

export async function startServer(
  listener: RequestListener,
  config: { server?: ServerOptions },
): Promise<void> {
  if (config.server?.tls) {
    const server = Https.createServer(
      {
        cert: await fs.promises.readFile(config.server.tls.cert),
        key: await fs.promises.readFile(config.server.tls.key),
      },
      listener,
    )
    await serverListenWithDefault(server, config.server)
  } else {
    const server = Http.createServer({}, listener)
    await serverListenWithDefault(server, config.server)
  }
}
