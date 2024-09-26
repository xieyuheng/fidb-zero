import qs from "qs"
import { type Data } from "../../database/index.js"
import { type DataFindOptions } from "../../resources/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function dataFind(
  ctx: ClientContext,
  path: string,
  options: DataFindOptions,
): Promise<Array<Data>> {
  const query = qs.stringify(options)

  const response = await fetch(
    new URL(`${path}?kind=data-find&${query}`, ctx.url),
    {
      method: "GET",
      headers: {
        authorization: ctx.authorization,
      },
    },
  )

  checkResponse(ctx, response)

  return await response.json()
}
