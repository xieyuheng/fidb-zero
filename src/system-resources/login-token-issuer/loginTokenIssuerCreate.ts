import { Database } from "../../database"
import { PermissionRecord } from "../../models/permission/PermissionRecord"
import { dataCreate } from "../../resources"

export async function loginTokenIssuerCreate(
  db: Database,
  path: string,
  input: {
    permissions: PermissionRecord
  },
): Promise<void> {
  await dataCreate(db, `${path}/.token-issuer`, input)
}
