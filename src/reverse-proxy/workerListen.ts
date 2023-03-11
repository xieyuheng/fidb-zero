import type { Worker } from "./Worker"

export async function workerListen(worker: Worker) {
  for await (const [kind, requestId, request] of worker.dealer) {
    switch (String(kind)) {
      case "Request": {
        //
      }
    }
  }
}
