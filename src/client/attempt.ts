import { ClientError } from "./ClientError"

export type ClientResult<A> =
  | { kind: "Error"; error: ClientError }
  | { kind: "Data"; data: A }

export async function attempt<A>(
  f: () => Promise<A>,
): Promise<ClientResult<A>> {
  try {
    const data = await f()
    return { kind: "Data", data }
  } catch (error) {
    if (error instanceof ClientError) {
      return { kind: "Error", error }
    }

    throw error
  }
}
