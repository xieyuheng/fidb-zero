import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer.js"

test("data-post-no-token", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, ctx.url), {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: "xieyuheng",
          name: "Xie Yuheng",
        }),
      })
    ).status,
  ).toEqual(401)
})
