import { ClientError } from "./ClientError"
import { attempt } from "./attempt"

export async function errorOrFail<A>(
  f: () => Promise<A>,
): Promise<ClientError> {
  const result = await attempt(() => f())

  if (result.kind === "Error") {
    return result.error
  }

  throw new Error(`[errorOrFail] I expect error`)
}
