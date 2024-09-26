import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("directory-get-nested", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  {
    const results = await api.directoryGet(ctx, `projects/1`)
    expect(results.length).toEqual(0)
  }

  await api.dataCreate(ctx, `projects/1/users/1`, {})

  {
    const results = await api.directoryGet(ctx, `projects/1`)
    expect(results.length).toEqual(1)
    expect(
      Boolean(results.find(({ path }) => path === "projects/1/users")),
    ).toEqual(true)
    expect(
      Boolean(results.find(({ path }) => path === "projects/1/posts")),
    ).toEqual(false)
  }

  await api.dataCreate(ctx, `projects/1/posts/1`, {})

  {
    const results = await api.directoryGet(ctx, `projects/1`)
    expect(results.length).toEqual(2)
    expect(
      Boolean(results.find(({ path }) => path === "projects/1/users")),
    ).toEqual(true)
    expect(
      Boolean(results.find(({ path }) => path === "projects/1/posts")),
    ).toEqual(true)
  }
})
