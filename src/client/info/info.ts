import { type Json } from "../../utils/Json.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function info(ctx: ClientContext): Promise<Json> {
  const response = await fetch(new URL(`?kind=info`, ctx.url), {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })

  checkResponse(ctx, response)

  return await response.json()
}
