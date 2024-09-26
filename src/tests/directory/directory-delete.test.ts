import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("directory-delete", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  await api.directoryCreate(ctx, `users`)

  {
    const results = await api.directoryGet(ctx, "")
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(true)
  }

  await api.directoryDelete(ctx, `users`)

  {
    const results = await api.directoryGet(ctx, "")
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(false)
  }
})
