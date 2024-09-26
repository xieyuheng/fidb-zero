import { globMatch } from "../../utils/globMatch.js"
import { type Operation } from "./Operation.js"
import { type PermissionRecord } from "./PermissionRecord.js"

export function matchPermissionRecord(
  permissions: PermissionRecord,
  path: string,
  operation: Operation,
): boolean {
  for (const [pattern, operations] of Object.entries(permissions)) {
    if (globMatch(pattern, path)) {
      if (operations.includes(operation)) {
        return true
      } else {
        return false
      }
    }
  }

  return false
}
