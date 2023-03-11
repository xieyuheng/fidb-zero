export type Service = {
  name: string
  requests: Array<{ requestId: string; request: Buffer }>
  encryptionKey: Uint8Array
  workerIds: Array<Buffer>
}

export function createService(
  name: string,
  encryptionKey: Uint8Array,
  options: {
    requests?: Array<{ requestId: string; request: Buffer }>
    workerIds?: Array<Buffer>
  },
): Service {
  return {
    name,
    encryptionKey,
    requests: options.requests || [],
    workerIds: options.workerIds || [],
  }
}