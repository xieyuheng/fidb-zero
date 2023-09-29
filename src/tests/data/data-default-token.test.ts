import { expect, test } from "vitest"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("data-default-token", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  await api.dataCreate(ctx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await api.dataCreate(ctx, `users/xieyuheng/projects/inner`, {
    name: "inner",
    description: "Ones inner universe.",
  })

  await api.dataCreate(ctx, `users/xieyuheng/public/projects/inner`, {
    name: "inner",
    description: "Ones inner universe.",
  })

  {
    // Default token can NOT read non public data.

    const response = await fetch(
      new URL(`users/xieyuheng/projects/inner`, ctx.url),
      {
        method: "GET",
      },
    )

    expect(response.status).toEqual(401)
  }

  {
    // Default token can read user data.

    await api.dataGetOrFail(ctx, `users/xieyuheng`)
  }

  {
    // Default token can read public data.

    const project = await api.dataGetOrFail(
      ctx,
      `users/xieyuheng/public/projects/inner`,
    )

    expect(project.name).toEqual("inner")
    expect(project.description).toEqual("Ones inner universe.")
  }
})
