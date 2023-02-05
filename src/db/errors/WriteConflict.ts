export class WriteConflict extends Error {
  constructor(message: string) {
    super(message)
  }
}
