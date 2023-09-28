import qs from "qs"
import { Data } from "../../database"
import { DataFindOptions } from "../../resources"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

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
