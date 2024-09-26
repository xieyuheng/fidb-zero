import { type Database } from "../../database/index.js"
import { applyPathPatternRecordKeys } from "../../models/path-pattern/index.js"
import {
  type Operation,
  matchPermissionRecord,
} from "../../models/permission/index.js"
import { dataGetOrFail } from "../../resources/index.js"
import { groupGet } from "../group/index.js"
import { TokenIssuerSchema } from "../token-issuer/index.js"
import { tokenGetOrFail } from "./tokenGetOrFail.js"

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

  if (token.issuerRevision !== issuer["@revision"]) {
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
