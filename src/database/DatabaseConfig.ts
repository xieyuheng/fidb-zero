import { ty } from "@xieyuheng/ty"

export type DatabaseConfig = {
  name: string
  description?: string
}

export const databaseConfigSchema = ty.object({
  name: ty.string(),
  description: ty.optional(ty.string()),
})
