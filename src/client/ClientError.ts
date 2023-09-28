import { ClientContext } from "./ClientContext"

export class ClientError extends Error {
  constructor(
    public ctx: ClientContext,
    public statusCode: number,
    public statusMessage: string,
  ) {
    super(
      [
        `[${statusCode}] ${decodeURIComponent(statusMessage)}`,
        ``,
        `  url: ${ctx.url}`,
      ].join("\n"),
    )
  }
}
