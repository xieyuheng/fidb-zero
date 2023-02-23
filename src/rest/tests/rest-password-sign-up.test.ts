import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-password-sign-up", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  db.config = {
    name: "rest-password-sign-up",
    authDirectories: {
      users: {
        permissions: ["create", "read", "update", "delete"],
      },
    },
  }

  const response = await fetch(`${url}/users?kind=password-sign-up`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data: {
        username: "xieyuheng",
        name: "Xie Yuheng",
      },
      options: {
        memo: "My favorite password.",
        password: "123456",
      },
    }),
  })

  console.log({
    text: response.statusText,
  })

  expect(response.ok).toEqual(true)
})
