import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "node:fs"
import Http from "node:http"
import Https from "node:https"
import { resolve } from "node:path"
import { createDatabase } from "../../database"
import * as ReverseProxy from "../../reverse-proxy"
import { createRequestListener } from "../../utils/createRequestListener"
import { findPort } from "../../utils/findPort"
import { serverListen } from "../../utils/serverListen"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  cert?: string
  key?: string
}

export class ServeReverseProxyCommand extends Command<Args> {
  name = "serve-reverse-proxy"

  description = "Serve a reverse proxy"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    cert: ty.optional(ty.string()),
    key: ty.optional(ty.string()),
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `using it as a database, and serve a reverse proxy.`,
      ``,
      blue(`  ${runner.name} ${this.name} tmp/databases/reverse-proxy`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const db = await createDatabase({ path: resolve(argv.path) })

    const requestListener = createRequestListener({
      ctx: { db, targets: {} },
      handle: ReverseProxy.handle,
    })

    const hostname = argv.hostname || "127.0.0.1"
    const port = process.env.PORT || argv.port || (await findPort(3000))

    if (argv.cert && argv.key) {
      const server = Https.createServer({
        cert: await fs.promises.readFile(argv.cert),
        key: await fs.promises.readFile(argv.key),
      })

      server.on("request", requestListener)

      await serverListen(server, { hostname, port })

      console.dir(
        {
          who: `[ServeReverseProxyCommand.execute]`,
          url: `https://${hostname}:${port}`,
          db,
        },
        {
          depth: null,
        },
      )
    } else {
      const server = Http.createServer()

      server.on("request", requestListener)

      await serverListen(server, { hostname, port })

      console.dir(
        {
          who: `[ServeReverseProxyCommand.execute]`,
          url: `http://${hostname}:${port}`,
          db,
        },
        {
          depth: null,
        },
      )
    }
  }
}
