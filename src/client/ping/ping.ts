import { type Json } from "../../utils/Json.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function ping(ctx: ClientContext): Promise<Json> {
  const response = await fetch(new URL(`?kind=ping`, ctx.url), {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })

  checkResponse(ctx, response)

  return await response.json()
}
