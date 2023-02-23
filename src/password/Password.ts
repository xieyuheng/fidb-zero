import ty, { Schema } from "@xieyuheng/ty"
import { Data, dataSchema } from "../data"
import { TokenPermission, tokenPermissionSchema } from "../token"

export type Password = Data & {
  memo: string
  hash: string
  permissions: Array<TokenPermission>
}

export const passwordSchema: Schema<Password> = ty.intersection(
  dataSchema,
  ty.object({
    memo: ty.string(),
    hash: ty.string(),
    permissions: ty.array(tokenPermissionSchema),
  }),
)
