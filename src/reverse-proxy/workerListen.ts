import { Socket } from "node:net"
import { decrypt } from "../utils/decrypt"
import { encrypt } from "../utils/encrypt"
import { log } from "../utils/log"
import type { Worker } from "./Worker"

export async function workerListen(worker: Worker) {
  const who = "worker"

  for await (const [kind, requestId, request] of worker.dealer) {
    switch (String(kind)) {
      case "Request": {
        const localSocket = new Socket()

        localSocket.connect(
          worker.local.port,
          worker.local.hostname,
          async () => {
            log({ who, message: "localSocket connected" })
            localSocket.write(await decrypt(request, worker.encryptionKey))
            log({ who, message: "data sent", length: request.length })
          },
        )

        localSocket.on("data", async (data) => {
          await worker.dealer.send([
            "Data",
            requestId,
            await encrypt(data, worker.encryptionKey),
          ])
        })

        localSocket.on("end", async () => {
          await worker.dealer.send(["End", requestId])
        })

        localSocket.on("close", () => {
          log({ who, message: "localSocket closed" })
        })
      }
    }
  }
}
