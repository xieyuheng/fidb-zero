import { Schema, ty } from "@xieyuheng/ty"

export type DatabaseConfig = {
  name: string
  description: string
}

export const DatabaseConfigSchema: Schema<DatabaseConfig> = ty.object({
  name: ty.string(),
  description: ty.string(),
})

export type DatabaseConfigOptions = {
  name: string
  description?: string
}

export const DatabaseConfigOptionsSchema: Schema<DatabaseConfigOptions> =
  ty.object({
    name: ty.string(),
    description: ty.optional(ty.string()),
  })
