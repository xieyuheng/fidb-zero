import qs from "qs"
import { type PathEntry } from "../../resources/directory/PathEntry.js"
import { type DirectoryGetOptions } from "../../resources/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function directoryGet(
  ctx: ClientContext,
  directory: string,
  options?: DirectoryGetOptions,
): Promise<Array<PathEntry>> {
  const query = qs.stringify(options)

  const response = await fetch(
    new URL(`${directory}?kind=directory&${query}`, ctx.url),
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
