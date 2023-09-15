import { Schema, ty } from "@xieyuheng/ty"
import { LoggerOptions, LoggerOptionsSchema } from "../server/LoggerOptions"
import { ServerOptions, ServerOptionsSchema } from "../server/ServerOptions"

export type DatabaseConfig = {
  name: string
  description: string
  server?: ServerOptions
  logger?: LoggerOptions
}

export const DatabaseConfigSchema: Schema<DatabaseConfig> = ty.object({
  name: ty.string(),
  description: ty.string(),
  server: ty.optional(ServerOptionsSchema),
  logger: ty.optional(LoggerOptionsSchema),
})
