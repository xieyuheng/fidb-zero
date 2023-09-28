import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function fileCreate(
  ctx: ClientContext,
  path: string,
  bytes: Uint8Array,
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
