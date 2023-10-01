import { Database } from "../../database"
import { applyPathPatternRecordKeys } from "../../models/path-pattern"
import { Operation, matchPermissionRecord } from "../../models/permission"
import { dataGetOrFail } from "../../resources"
import { groupGet } from "../group"
import { TokenIssuerSchema } from "../token-issuer"
import { tokenGetOrFail } from "./tokenGetOrFail"

export async function tokenCheck(
  db: Database,
  tokenName: string,
  path: string,
  operation: Operation,
): Promise<boolean> {
  const token = await tokenGetOrFail(db, tokenName)

  const issuer = TokenIssuerSchema.validate(
    await dataGetOrFail(db, token.issuer),
  )

  if (token.issuerUpdatedAt !== issuer["@updatedAt"]) {
    // A user might be deleted and recreated again,
    // the old token can not be used for the new uesr.
    return false
  }

  for (const groupName of issuer.groups) {
    const group = await groupGet(db, groupName)

    if (group !== undefined) {
      const permissions = applyPathPatternRecordKeys(group.permissions, {
        user: issuer.user,
      })

      const ok = matchPermissionRecord(permissions, path, operation)
      if (ok) {
        return true
      }
    }
  }

  return false
}
