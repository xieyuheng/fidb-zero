import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("directory-get-by-page", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  await api.dataCreate(ctx, `projects/1/users/1`, {})
  await api.dataCreate(ctx, `projects/1/posts/1`, {})

  {
    const results = await api.directoryGet(ctx, `projects/1`, {
      page: 1,
      size: 1,
    })

    expect(results.length).toEqual(1)
    expect(
      Boolean(
        results.find(
          ({ path }) =>
            path === "projects/1/users" || path === "projects/1/posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const results = await api.directoryGet(ctx, `projects/1`, {
      page: 2,
      size: 1,
    })

    expect(results.length).toEqual(1)
    expect(
      Boolean(
        results.find(
          ({ path }) =>
            path === "projects/1/users" || path === "projects/1/posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const results = await api.directoryGet(ctx, `projects/1`, {
      page: 3,
      size: 1,
    })

    expect(results.length).toEqual(0)
  }
})
