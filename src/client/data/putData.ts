import { Data } from "../../database"
import { JsonObject } from "../../utils/Json"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function putData(
  ctx: ClientContext,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "PUT",
    headers: {
      authorization: ctx.authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  })

  checkResponse(ctx, response)

  return await response.json()
}
