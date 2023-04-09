import { expect, test } from "vitest"
import { allOperations } from "../../operation"
import { prepareTestServer } from "./prepareTestServer"

test("handle-password-register", async ({ meta }) => {
  const { url, db, authorization } = await prepareTestServer(meta)

  db.config = {
    name: "handle-password-register",
    description: "",
    authDirectories: {
      users: {
        permissions: allOperations,
      },
    },
  }

  const created = await (
    await fetch(new URL(`users/xieyuheng?kind=password-register`, url), {
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
      new URL(`users/xieyuheng/password?kind=directory`, url),
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
