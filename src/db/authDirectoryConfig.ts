import type { AuthDirectoryConfig, Database } from "../database"

export async function authDirectoryConfig(
  db: Database,
  directory: string,
): Promise<AuthDirectoryConfig | undefined> {
  const authDirectories = db.config?.authDirectories

  if (authDirectories === undefined) {
    return undefined
  }

  return authDirectories[directory]
}
