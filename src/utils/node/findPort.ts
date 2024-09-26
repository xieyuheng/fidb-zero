import getPort from "get-port"

export async function findPort(port: number): Promise<number> {
  return await getPort({port})
}
