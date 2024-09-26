import { Schema, ty } from "@xieyuheng/ty"
import { type TlsOptions, TlsOptionsSchema } from "./TlsOptions.js"

export type ServerOptions = {
  hostname?: string
  port?: number
  startingPort?: number
  tls?: TlsOptions
}

export const ServerOptionsSchema: Schema<ServerOptions> = ty.object({
  hostname: ty.optional(ty.string()),
  port: ty.optional(ty.number()),
  startingPort: ty.optional(ty.number()),
  tls: ty.optional(TlsOptionsSchema),
})
