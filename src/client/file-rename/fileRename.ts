import { type ClientContext } from "../ClientContext.js"

export async function fileRename(
  ctx: ClientContext,
  from: string,
  options: {
    to: string
  },
): Promise<void> {
  await fetch(new URL(`${from}?kind=file-rename`, ctx.url), {
    method: "POST",
    headers: {
      authorization: ctx.authorization,
    },
    body: JSON.stringify({
      to: options.to,
    }),
  })
}
