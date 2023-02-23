import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-password-sign-up", async ({ meta }) => {
  const { url, db, authorization } = await prepareTestServer(meta)

  db.config = {
    name: "rest-password-sign-up",
    authDirectories: {
      users: {
        permissions: ["create", "read", "update", "delete"],
      },
    },
  }

  const created = await (
    await fetch(`${url}/users/xieyuheng?kind=password-sign-up`, {
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
  ).json()

  {
    const response = await fetch(
      `${url}/users/xieyuheng/passwords?kind=directory`,
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    const results = await response.json()
    expect(results.length).toEqual(1)
  }
})
