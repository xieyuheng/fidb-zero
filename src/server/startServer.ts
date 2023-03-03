import fs from "node:fs"
import Http from "node:http"
import Https from "node:https"
import type { RequestListener } from "../server/createRequestListener"
import { serverListen } from "../server/serverListen"
import { log } from "../utils/log"
import { findPort } from "../utils/node/findPort"

type Options = {
  who: string
  hostname?: string
  port?: number
  startingPort?: number
  "tls-cert"?: string
  "tls-key"?: string
}

export async function startServer(
  options: Options,
  requestListener: RequestListener,
): Promise<{ server: Http.Server | Https.Server; url: URL }> {
  const hostname = options.hostname || "127.0.0.1"
  const port = Number(
    process.env.PORT ||
      options.port ||
      (await findPort(options.startingPort || 3000)),
  )

  if (options["tls-cert"] && options["tls-key"]) {
    const server = Https.createServer(
      {
        cert: await fs.promises.readFile(options["tls-cert"]),
        key: await fs.promises.readFile(options["tls-key"]),
      },
      requestListener,
    )

    await serverListen(server, { hostname, port })

    const url = new URL(`https://${hostname}:${port}`)

    log({ who: options.who, url: url.toString() })

    return { server, url }
  } else {
    const server = Http.createServer({}, requestListener)

    await serverListen(server, { hostname, port })

    const url = new URL(`http://${hostname}:${port}`)

    log({ who: options.who, url: url.toString() })

    return { server, url }
  }
}
