import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import inquirer from "inquirer"
import { createDatabase } from "../../database"
import { log } from "../../utils/log"
import { env } from "../env"

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
    const who = this.name

    const { username, password } = await inquirer.prompt([
      { type: "input", name: "username", message: "Username" },
      { type: "password", name: "password", message: "Password", mask: "*" },
    ])

    const response = await fetch(
      `${argv.url}/users/${username}?kind=password-login`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      },
    )

    if (response.ok) {
      const token = await response.json()

      const db = await createDatabase({ path: env.FIDB_SYSTEM_DB_DIR })

      // if (!(await Db.jsonFileGet(db, `reverse-proxy-tokens.json`))) {
      //   await Db.jsonFileCreate(db, `reverse-proxy-tokens.json`, {})
      // }

      // await Db.jsonFilePatch(db, `reverse-proxy-tokens.json`, {
      //   [argv.url]: token,
      // })

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
