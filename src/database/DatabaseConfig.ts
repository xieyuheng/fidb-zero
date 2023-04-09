import { Schema, ty } from "@xieyuheng/ty"
import { Operation, OperationSchema } from "../token/Operation"

export type AuthDirectoryConfig = {
  permissions: Array<Operation>
}

export const AuthDirectoryConfigSchema: Schema<AuthDirectoryConfig> = ty.object(
  {
    permissions: ty.array(OperationSchema),
  },
)

export type DatabaseConfig = {
  name: string
  description: string
  authDirectories: Record<string, AuthDirectoryConfig>
}

export const DatabaseConfigSchema: Schema<DatabaseConfig> = ty.object({
  name: ty.string(),
  description: ty.string(),
  authDirectories: ty.dict(AuthDirectoryConfigSchema),
})

export const emptyDatabaseConfig: DatabaseConfig = {
  name: "",
  description: "",
  authDirectories: {},
}

export type DatabaseConfigOptions = {
  name: string
  description?: string
  authDirectories?: Record<string, AuthDirectoryConfig>
}

export const DatabaseConfigOptionsSchema: Schema<DatabaseConfigOptions> =
  ty.object({
    name: ty.string(),
    description: ty.optional(ty.string()),
    authDirectories: ty.optional(ty.dict(AuthDirectoryConfigSchema)),
  })
