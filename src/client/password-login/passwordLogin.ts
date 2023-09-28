import { PasswordLoginOptions } from "../../resources"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function passwordLogin(
  ctx: ClientContext,
  directory: string,
  options: PasswordLoginOptions,
): Promise<{ token: string }> {
  const response = await fetch(
    new URL(`${directory}?kind=password-login`, ctx.url),
    {
      method: "POST",
      body: JSON.stringify(options),
    },
  )

  checkResponse(ctx, response)

  return await response.json()
}
