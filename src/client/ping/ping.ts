import { Json } from "../../utils/Json"
import { ClientContext } from "../ClientContext"

export async function ping(ctx: ClientContext): Promise<Json> {
  const response = await fetch(new URL(`?kind=ping`, ctx.url), {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })

  return await response.json()
}
