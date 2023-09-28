import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function dataDelete(
  ctx: ClientContext,
  path: string,
  input: { "@revision": string },
): Promise<void> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "DELETE",
    headers: {
      authorization: ctx.authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "@revision": input["@revision"],
    }),
  })

  checkResponse(ctx, response)
}
