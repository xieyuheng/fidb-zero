import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { resolve } from "node:path"
import { createDatabase } from "../../database"
import * as ReverseProxy from "../../reverse-proxy"
import { createRequestListener } from "../../utils/createRequestListener"
import { startServer } from "./startServer"

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
    const who = `[ServeReverseProxyCommand.execute]`

    const db = await createDatabase({ path: resolve(argv.path) })

    console.log({ who, db })

    const requestListener = createRequestListener({
      ctx: { db, targets: {} },
      handle: ReverseProxy.handle,
    })

    await startServer({ who, ...argv }, requestListener)
  }
}
