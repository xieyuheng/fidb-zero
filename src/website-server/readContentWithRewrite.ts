import type { Context } from "./Context"
import { Content, readContent } from "./readContent"

export async function readContentWithRewrite(
  ctx: Context,
  path: string,
): Promise<Content | undefined> {
  return (
    (await readContent(ctx, path)) ||
    (ctx.rewriteNotFoundTo
      ? await readContent(ctx, ctx.rewriteNotFoundTo)
      : undefined)
  )
}
