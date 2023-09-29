import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer"

test("directory-can-not-access-system-path", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  {
    const response = await fetch(new URL(`.tokens?kind=directory`, ctx.url), {
      method: "GET",
      headers: {
        authorization: ctx.authorization,
      },
    })

    expect(response.status).toEqual(401)
  }
})
