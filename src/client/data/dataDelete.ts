import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

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
