import { DatabaseConfig } from "../../database"
import { log } from "../../utils/log"
import { createContext } from "./createContext"

export async function startServer(
  directory: string,
  config: DatabaseConfig,
): Promise<void> {
  const who = "subdomain/startServer"

  const ctx = await createContext({ directory, config })
  log({ who, message: "createContext", ctx })

  // const listener = createRequestListener({ ctx, handle, logger: config.logger })

  // if (config.server?.tls) {
  //   const server = Https.createServer(
  //     {
  //       cert: await fs.promises.readFile(config.server.tls.cert),
  //       key: await fs.promises.readFile(config.server.tls.key),
  //     },
  //     listener,
  //   )
  //   await serverListenWithDefault(server, config.server)
  // } else {
  //   const server = Http.createServer({}, listener)
  //   await serverListenWithDefault(server, config.server)
  // }
}
