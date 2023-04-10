import ty, { Schema } from "@xieyuheng/ty"
import { TokenIssuer, TokenIssuerSchema } from "../token/TokenIssuer"

export type PasswordRegisterStrategy = {
  loginTargets: Record<string, TokenIssuer>
}

export const PasswordRegisterStrategySchema: Schema<PasswordRegisterStrategy> =
  ty.object({
    loginTargets: ty.dict(TokenIssuerSchema),
  })
