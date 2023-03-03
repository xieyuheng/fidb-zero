import type { RequestListener } from "../server/createRequestListener"
import { serverListen } from "../server/serverListen"
import { log } from "../utils/log"
import { findPort } from "../utils/node/findPort"
import { createServer } from "./createServer"

type Options = {
  who: string
  hostname?: string
  port?: number
  startingPort?: number
  tlsCert?: string
  tlsKey?: string
}

export async function startServer(
  options: Options,
  requestListener: RequestListener,
): Promise<{ url: URL }> {
  const { scheme, server } = await createServer(options, requestListener)

  const hostname = options.hostname || "127.0.0.1"
  const port = Number(
    process.env.PORT ||
      options.port ||
      (await findPort(options.startingPort || 3000)),
  )

  await serverListen(server, { hostname, port })

  const url = new URL(`${scheme}://${hostname}:${port}`)

  log({ who: options.who, url: url.toString() })

  return { url }
}
