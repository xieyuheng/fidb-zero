import { Schema, ty } from "@xieyuheng/ty"
import { TokenPermission, tokenPermissionSchema } from "../token"

export type AuthDirectoryConfig = {
  permissions: Array<TokenPermission>
}

export const authDirectoryConfigSchema: Schema<AuthDirectoryConfig> = ty.object(
  {
    permissions: ty.array(tokenPermissionSchema),
  },
)

export type DatabaseConfig = {
  name: string
  description?: string
  authDirectories?: Record<string, AuthDirectoryConfig>
}

export const databaseConfigSchema: Schema<DatabaseConfig> = ty.object({
  name: ty.string(),
  description: ty.optional(ty.string()),
  authDirectories: ty.optional(ty.dict(authDirectoryConfigSchema)),
})
