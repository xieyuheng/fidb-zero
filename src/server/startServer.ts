import type { RequestListener } from "../server/createRequestListener"
import { serverListen } from "../server/serverListen"
import { findPort } from "../utils/node/findPort"
import { createServer, TlsOptions } from "./createServer"

type Options = {
  hostname?: string
  port?: number
  startingPort?: number
  tls?: TlsOptions
}

export async function startServer(
  options: Options,
  requestListener: RequestListener,
): Promise<{ url: URL }> {
  const { scheme, server } = await createServer(requestListener, options)

  const hostname = options.hostname || "127.0.0.1"
  const port = Number(
    process.env.PORT ||
      options.port ||
      (await findPort(options.startingPort || 3000)),
  )

  await serverListen(server, { hostname, port })

  const url = new URL(`${scheme}://${hostname}:${port}`)

  return { url }
}
