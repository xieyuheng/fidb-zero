import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer"

test("data-post-no-token", async ({ task }) => {
  const { url } = await prepareTestServer(task)

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, url), {
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
