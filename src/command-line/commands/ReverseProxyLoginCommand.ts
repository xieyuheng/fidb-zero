import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import inquirer from "inquirer"
import * as ReverseProxyClient from "../../reverse-proxy-client"

type Args = { url: string }
type Opts = {}

export class ReverseProxyLoginCommand extends Command<Args> {
  name = "reverse-proxy:login"

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
    const { username, password } = await inquirer.prompt([
      { type: "input", name: "username", message: "Username" },
      { type: "password", name: "password", message: "Password", mask: "*" },
    ])

    await ReverseProxyClient.login({
      url: new URL(argv.url),
      username,
      password,
    })
  }
}
