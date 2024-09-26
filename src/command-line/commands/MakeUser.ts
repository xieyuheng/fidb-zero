import * as prompts from "@inquirer/prompts"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import { join } from "path"
import { readDatabaseConfigFile } from "../../database/readDatabaseConfigFile.js"
import { dataGet } from "../../resources/index.js"
import { makeUser } from "../../services/make/makeUser.js"
import { log } from "../../utils/log.js"

type Args = { "username:group": string }
type Opts = { data: string }

export class MakeUser extends Command<Args> {
  name = "make:user"

  description = "Make a user"

  args = { "username:group": ty.string() }
  opts = { data: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command takes a username`,
      `and the user's groups to create a user in the database.`,
      `The user's initial password will be asked during the making.`,
      ``,
      blue(`  ${runner.name} ${this.name} owner:owner`),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const who = "MakeUser"

    const [username, group] = argv["username:group"].split(":")
    const path = process.cwd()
    const directory = path
    const configFile = join(path, "database.json")
    const config = await readDatabaseConfigFile(configFile)
    const db = { directory, config }

    const found = await dataGet(db, `users/${username}`)
    if (found !== undefined) {
      return log({
        who,
        kind: "Error",
        message: "user already exists",
        username,
      })
    }

    const password = await prompts.password({
      message: "Password:",
      mask: true,
    })

    if (password.length === 0) {
      throw new Error(`[makeUser] password can not be empty.`)
    }

    const data = JSON.parse(argv.data)
    await makeUser(db, username, group, { password, data })
  }
}
