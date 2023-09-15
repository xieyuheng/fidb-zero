import { RequestListener } from "../../server/RequestListener"
import { findPort } from "../../utils/node/findPort"
import { serverListen } from "../../utils/node/serverListen"
import { TlsOptions, createServer } from "./createServer"

type Options = {
  hostname?: string
  port?: number
  startingPort?: number
  tls?: TlsOptions
}

export async function startServer(
  requestListener: RequestListener,
  options: Options,
): Promise<{ url: URL }> {
  const { scheme, server } = await createServer(requestListener, options)

  const hostname = options.hostname || "127.0.0.1"
  const port = Number(
    process.env.PORT ||
      options.port ||
      (await findPort(options.startingPort || 5108)),
  )

  await serverListen(server, { hostname, port })

  const url = new URL(`${scheme}://${hostname}:${port}`)

  return { url }
}
