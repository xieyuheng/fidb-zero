import { CommandRunner, CommandRunners } from "@xieyuheng/command-line"
import * as Commands from "./commands"

export function createCommandRunner(): CommandRunner {
  return new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.DefaultCommand(),
    commands: [
      new Commands.CommonHelpCommand(),
      new Commands.ServeDatabaseCommand(),
      new Commands.ServeWebsiteCommand(),
      new Commands.ServeReverseProxyCommand(),
      new Commands.ImportDatasetCommand(),
    ],
  })
}
