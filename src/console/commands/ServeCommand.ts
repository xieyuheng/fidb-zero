import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { createDatabase } from "../../database"
import * as Rest from "../../rest"

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
      blue(`  ${runner.name} ${this.name} tmp/test`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const db = createDatabase({ path: argv.path })
    await Rest.serve({
      db,
      hostname: argv.hostname || "127.0.0.1",
      port: argv.port || 3000,
    })
  }
}