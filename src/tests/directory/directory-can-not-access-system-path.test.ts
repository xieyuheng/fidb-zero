import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("directory-can-not-access-system-path", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const newCtx = api.createClientContext(ctx.url, "default")

  const response = await fetch(new URL(`.tokens?kind=directory`, ctx.url), {
    method: "GET",
    headers: {
      authorization: newCtx.authorization,
    },
  })

  expect(response.status).toEqual(401)
})
