import { type Data } from "../../database/index.js"
import { type PasswordRegisterOptions } from "../../resources/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

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
