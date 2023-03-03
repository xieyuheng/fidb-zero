import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import { log } from "../../utils/log"

type Args = { url: string }
type Opts = {}

export class LoginReverseProxyCommand extends Command<Args> {
  name = "login-reverse-proxy"

  description = "Login to a reverse proxy server"

  args = { url: ty.string() }
  opts = {}

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a url of a reverse proxy server,`,
      `and login to it by username and password,`,
      `the returned token will be saved to ~/.fidb/`,
      ``,
      blue(`  ${runner.name} ${this.name} https://fidb.app`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const who = this.name

    log({ who, argv })
  }
}
