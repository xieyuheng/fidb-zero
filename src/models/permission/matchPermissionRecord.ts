import { globMatch } from "../../utils/globMatch"
import { Operation } from "./Operation"
import { PermissionRecord } from "./PermissionRecord"

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
