import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function fileHas(
  ctx: ClientContext,
  path: string,
): Promise<boolean> {
  const response = await fetch(new URL(`${path}?kind=file`, ctx.url), {
    method: "HEAD",
    headers: {
      authorization: ctx.authorization,
    },
  })

  if (response.status === 404) {
    return false
  }

  checkResponse(ctx, response)

  return true
}
