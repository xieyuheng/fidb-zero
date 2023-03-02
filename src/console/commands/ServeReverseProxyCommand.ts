import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { resolve } from "node:path"
import { createDatabase } from "../../database"
import { handle } from "../../reverse-proxy-server"
import { createRequestListener } from "../../utils/createRequestListener"
import { log } from "../../utils/log"
import { startServer } from "./startServer"

type Args = { path: string }
type Opts = {
  hostname?: string
  port?: number
  "tls-cert"?: string
  "tls-key"?: string
}

export class ServeReverseProxyCommand extends Command<Args> {
  name = "serve-reverse-proxy"

  description = "Serve a reverse proxy"

  args = { path: ty.string() }
  opts = {
    hostname: ty.optional(ty.string()),
    port: ty.optional(ty.number()),
    "tls-cert": ty.optional(ty.string()),
    "tls-key": ty.optional(ty.string()),
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
    const who = this.name

    const db = await createDatabase({ path: resolve(argv.path) })

    log({ who, db })

    const requestListener = createRequestListener({
      ctx: { db, targets: {} },
      handle,
    })

    await startServer({ who, ...argv }, requestListener)
  }
}
