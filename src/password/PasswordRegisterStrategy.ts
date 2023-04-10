import ty, { Schema } from "@xieyuheng/ty"
import { TokenIssuerInput, TokenIssuerInputSchema } from "../token/TokenIssuer"

export type PasswordRegisterStrategy = {
  loginTargets: Record<string, TokenIssuerInput>
}

export const PasswordRegisterStrategySchema: Schema<PasswordRegisterStrategy> =
  ty.object({
    loginTargets: ty.dict(TokenIssuerInputSchema),
  })
