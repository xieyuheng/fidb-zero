import Http from "node:http"
import Https from "node:https"
import { log } from "../utils/log.js"
import { findPort } from "../utils/node/findPort.js"
import { serverListen } from "../utils/node/serverListen.js"
import { type ServerOptions } from "./ServerOptions.js"

export async function serverListenWithDefault(
  server: Http.Server | Https.Server,
  options?: ServerOptions,
): Promise<void> {
  const scheme = options?.tls ? "https" : "http"

  const hostname = options?.hostname || "127.0.0.1"

  const port = Number(
    process.env.PORT ||
      options?.port ||
      (await findPort(options?.startingPort || 5108)),
  )

  await serverListen(server, { hostname, port })

  log({
    who: "serverListenWithDefault.js",
    url: `${scheme}://${hostname}:${port}`,
  })
}
