import { ClientError } from "./ClientError.js"
import { attempt } from "./attempt.js"

export async function errorOrFail<A>(
  f: () => Promise<A>,
): Promise<ClientError> {
  const result = await attempt(() => f())

  if (result.kind === "Error") {
    return result.error
  }

  throw new Error(`[errorOrFail] I expect error`)
}
