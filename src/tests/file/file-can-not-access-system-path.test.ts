import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("file-can-not-access-system-path", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const newCtx = api.createClientContext(ctx.url, "default")

  const error = await api.errorOrFail(() =>
    api.fileGet(newCtx, ".guest-token-issuer"),
  )

  expect(error.statusCode).toEqual(401)
})
