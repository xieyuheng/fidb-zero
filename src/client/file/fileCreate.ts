import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function fileCreate(
  ctx: ClientContext,
  path: string,
  bytes: Uint8Array | string,
): Promise<void> {
  const response = await fetch(new URL(`${path}?kind=file`, ctx.url), {
    method: "POST",
    headers: {
      authorization: ctx.authorization,
    },
    body: bytes,
  })

  checkResponse(ctx, response)
}
