import { expect, test } from "vitest"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("data-default-token", async ({ task }) => {
  const { url, ctx } = await prepareTestServer(task)

  await api.createData(ctx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await api.createData(ctx, `users/xieyuheng/projects/inner`, {
    name: "inner",
    description: "Ones inner universe.",
  })

  await api.createData(ctx, `users/xieyuheng/public/projects/inner`, {
    name: "inner",
    description: "Ones inner universe.",
  })

  {
    // Default token can NOT read non public data.

    const response = await fetch(
      new URL(`users/xieyuheng/projects/inner`, url),
      {
        method: "GET",
      },
    )

    expect(response.status).toEqual(401)
  }

  {
    // Default token can read user data.

    await api.getDataOrFail(ctx, `users/xieyuheng`)
  }

  {
    // Default token can read public data.

    const project = await api.getDataOrFail(
      ctx,
      `users/xieyuheng/public/projects/inner`,
    )

    expect(project.name).toEqual("inner")
    expect(project.description).toEqual("Ones inner universe.")
  }
})
