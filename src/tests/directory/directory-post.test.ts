import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("directory-post", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  {
    const results = await api.directoryGet(ctx, "")
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(false)
  }

  await api.dataCreate(ctx, `users`, {})

  {
    const results = await api.directoryGet(ctx, "")
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(true)
  }
})
