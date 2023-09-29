import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("directory-get-recursive", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  {
    const results = await api.directoryGet(ctx, "")
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(false)
  }

  await api.dataCreate(ctx, `users/1`, {})

  {
    const results = await api.directoryGet(ctx, "", { recursive: true })
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(true)
    expect(Boolean(results.find(({ path }) => path === "users/1"))).toEqual(
      true,
    )
  }
})
