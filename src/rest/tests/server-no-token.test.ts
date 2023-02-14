import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-no-token", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  expect(
    (
      await fetch(`${url}/users/xieyuheng`, {
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
