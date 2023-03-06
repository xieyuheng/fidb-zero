export async function* dataStreamGroup(
  dataStream: AsyncGenerator<Uint8Array>,
  size: number,
) {
  let parts: Array<Uint8Array> = []
  for await (const data of dataStream) {
    parts.push(data)

    if (parts.length === size) {
      yield parts
      parts = []
    }
  }
}
