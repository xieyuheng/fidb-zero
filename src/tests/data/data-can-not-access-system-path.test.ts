import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("data-can-not-access-system-path", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const newCtx = api.createClientContext(ctx.url, "guest")

  const error = await api.errorOrFail(() =>
    api.dataGet(newCtx, `.guest-token-issuer`),
  )

  expect(error.statusCode).toEqual(401)
})
