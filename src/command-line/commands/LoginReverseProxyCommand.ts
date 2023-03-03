import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import inquirer from "inquirer"
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

    const { password } = await inquirer.prompt([
      { type: "password", name: "password", message: "Password: ", mask: "*" },
    ])

    const response = await fetch(`${argv.url}?kind=password-login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })

    if (response.ok) {
      const token = await response.json()
      log({ who, token })
    } else {
      log({
        who,
        kind: "Error",
        status: {
          code: response.status,
          message: response.statusText,
        },
      })
    }
  }
}
