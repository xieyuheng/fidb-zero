import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { loggedInGet } from "../../reverse-proxy-client/loggedInGet"

type Args = { url: string }
type Opts = {}

export class ReverseProxyWhoamiCommand extends Command<Args> {
  name = "reverse-proxy:whoami"

  description = "See who I logged in for a given reverse proxy server"

  args = { url: ty.string() }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a url of a reverse proxy server,`,
      `and print the username that is logged in.`,
      ``,
      blue(`  ${runner.name} ${this.name} https://fidb.app`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const who = this.name

    const url = new URL(argv.url)

    const found = await loggedInGet(url.href)
    if (found !== undefined) {
      console.log(found.username)
    } else {
      process.exit(1)
    }
  }
}
