import ty, { Schema } from "@xieyuheng/ty"
import {
  type LoggerOptions,
  LoggerOptionsSchema,
} from "../server/LoggerOptions.js"
import {
  type ServerOptions,
  ServerOptionsSchema,
} from "../server/ServerOptions.js"

export type DatabaseConfig = {
  name?: string
  description?: string
  server?: ServerOptions
  logger?: LoggerOptions
}

export const DatabaseConfigSchema: Schema<DatabaseConfig> = ty.object({
  name: ty.optional(ty.string()),
  description: ty.optional(ty.string()),
  server: ty.optional(ServerOptionsSchema),
  logger: ty.optional(LoggerOptionsSchema),
})
