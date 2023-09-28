import { PasswordLoginOptions } from "../../resources"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function passwordLogin(
  ctx: ClientContext,
  directory: string,
  options: PasswordLoginOptions,
): Promise<string> {
  const response = await fetch(
    new URL(`${directory}?kind=password-login`, ctx.url),
    {
      method: "POST",
      body: JSON.stringify(options),
    },
  )

  checkResponse(ctx, response)

  const { token } = await response.json()

  return token
}
