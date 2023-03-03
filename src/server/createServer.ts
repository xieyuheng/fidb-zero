import fs from "node:fs"
import Http from "node:http"
import Https from "node:https"
import type { RequestListener } from "../server/createRequestListener"

type Options = {
  tlsCert?: string
  tlsKey?: string
}

type Result =
  | {
      scheme: "http"
      server: Http.Server
    }
  | {
      scheme: "https"
      server: Https.Server
    }

export async function createServer(
  options: Options,
  requestListener: RequestListener,
): Promise<Result> {
  if (options.tlsCert && options.tlsKey) {
    return {
      scheme: "https",
      server: Https.createServer(
        {
          cert: await fs.promises.readFile(options.tlsCert),
          key: await fs.promises.readFile(options.tlsKey),
        },
        requestListener,
      ),
    }
  } else {
    return {
      scheme: "http",
      server: Http.createServer({}, requestListener),
    }
  }
}
