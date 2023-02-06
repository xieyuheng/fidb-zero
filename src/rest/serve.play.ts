import { prepareTest } from "../db/test-utils"
import { serve } from "./serve"

async function play() {
  const { db } = await prepareTest()

  await serve(db, {
    hostname: "127.0.0.1",
    port: 3000,
  })
}

play().catch(console.error)
