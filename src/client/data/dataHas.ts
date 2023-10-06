import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function dataHas(
  ctx: ClientContext,
  path: string,
): Promise<boolean> {
  const response = await fetch(new URL(path, ctx.url), {
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
