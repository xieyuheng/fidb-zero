import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../data"
import { Operation, OperationSchema } from "../operation"

export type TokenIssuer = Data & {
  permissions: Record<string, Array<Operation>>
}

export const TokenIssuerSchema: Schema<TokenIssuer> = ty.intersection(
  DataSchema,
  ty.object({
    permissions: ty.dict(ty.array(OperationSchema)),
  }),
)

export type TokenIssuerInput = {
  permissions: Record<string, Array<Operation>>
}

export const TokenIssuerInputSchema: Schema<TokenIssuerInput> = ty.object({
  permissions: ty.dict(ty.array(OperationSchema)),
})
