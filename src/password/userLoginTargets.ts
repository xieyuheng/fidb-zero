import { allOperations, readOperations } from "../permission"
import { TokenIssuerInput } from "../token/TokenIssuer"

export const userLoginTargets: Record<string, TokenIssuerInput> = {
  "users/{user}": {
    permissions: {
      "users/{user}/**": allOperations,
      "users/*": ["data:get"],
      "users/*/public/**": readOperations,
    },
  },
}
