import { type FileMetadata } from "../../resources/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function fileMetadataGet(
  ctx: ClientContext,
  path: string,
): Promise<FileMetadata | undefined> {
  const response = await fetch(new URL(`${path}?kind=file-metadata`, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  if (response.status === 404) {
    return undefined
  }

  checkResponse(ctx, response)

  return response.json()
}
