import ty, { Schema } from "@xieyuheng/ty"
import { type LoggerName, LoggerNameSchema } from "../utils/log.js"

export type LoggerOptions = {
  name?: LoggerName
  disableRequestLogging?: boolean
}

export const LoggerOptionsSchema: Schema<LoggerOptions> = ty.object({
  name: ty.optional(LoggerNameSchema),
  disableRequestLogging: ty.optional(ty.boolean()),
})
