import fs from "node:fs"
import Http from "node:http"
import Https from "node:https"
import tls from "node:tls"
import { type DatabaseConfig } from "../../database/index.js"
import { createRequestListener } from "../../server/createRequestListener.js"
import { serverListenWithDefault } from "../../server/serverListenWithDefault.js"
import { log } from "../../utils/log.js"
import { createContext } from "./createContext.js"
import { findCertificate } from "./findCertificate.js"
import { handleSubdomain } from "./handleSubdomain.js"

export async function startSubdomainServer(
  directory: string,
  config: DatabaseConfig,
): Promise<void> {
  const who = "startSubdomainServer"

  const ctx = await createContext({ directory, config })
  log({ who, message: "createContext", ctx })

  const listener = createRequestListener({
    ctx,
    handle: handleSubdomain,
    logger: config.logger,
  })

  if (config.server?.tls) {
    const server = Https.createServer(
      {
        cert: await fs.promises.readFile(config.server.tls.cert),
        key: await fs.promises.readFile(config.server.tls.key),
        SNICallback: async (hostname, changeSecureContext) => {
          const certificate = await findCertificate(ctx.directory, hostname)
          if (certificate !== undefined) {
            const secureContext = tls.createSecureContext({ ...certificate })
            changeSecureContext(null, secureContext)
          } else {
            changeSecureContext(null, undefined)
          }
        },
      },
      listener,
    )
    await serverListenWithDefault(server, config.server)
  } else {
    const server = Http.createServer({}, listener)
    await serverListenWithDefault(server, config.server)
  }
}
