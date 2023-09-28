import { Data } from "../../database"
import { PasswordRegisterOptions } from "../../resources"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function passwordRegister(
  ctx: ClientContext,
  path: string,
  options: PasswordRegisterOptions,
): Promise<Data> {
  const response = await fetch(
    new URL(`${path}?kind=password-register`, ctx.url),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(options),
    },
  )

  checkResponse(ctx, response)

  return await response.json()
}
