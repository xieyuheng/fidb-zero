import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { resolve } from "node:path"
import { createDatabase } from "../../database"
import * as Rest from "../../rest"
import { findPort } from "../../utils/findPort"

type Args = { path: string }
type Opts = { hostname?: string; port?: number }

export class ServeCommand extends Command<Args> {
  name = "serve"

  description = "Serve a database"

  args = { path: ty.string() }
  opts = { hostname: ty.optional(ty.string()), port: ty.optional(ty.number()) }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a path to a directory,`,
      `and serve it as a database.`,
      ``,
      blue(`  ${runner.name} ${this.name} tmp/databases/test`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const db = await createDatabase({ path: resolve(argv.path) })

    const server = await Rest.createServer({ db })

    const hostname = argv.hostname || "127.0.0.1"
    const port = argv.port || (await findPort(3000))

    server.listen(port, hostname, () => {
      console.log({
        message: `[serve] start`,
        url: `http://${hostname}:${port}`,
        db,
      })
    })
  }
}
