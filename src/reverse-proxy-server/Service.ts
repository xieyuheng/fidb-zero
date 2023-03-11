export type Service = {
  name: string
  requests: Array<{ requestId: string; request: Buffer }>
  encryptionKey: Uint8Array
  workerIds: Array<Buffer>
}
