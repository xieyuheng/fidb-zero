import { expect, test } from "vitest"
import { allOperations } from "../../operation"
import { prepareTestServer } from "./prepareTestServer"

test("handle-password-register-and-login", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  db.config = {
    name: "handle-password-register-and-login",
    description: "",
    authDirectories: {
      users: {
        permissions: allOperations,
      },
    },
  }

  {
    const response = await fetch(
      new URL(`users/xieyuheng?kind=password-register`, url),
      {
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
      },
    )

    expect(response.ok).toEqual(true)

    const created = await response.json()

    expect(created.username).toEqual("xieyuheng")
    expect(created.name).toEqual("Xie Yuheng")
  }

  const token = await (
    await fetch(new URL(`users/xieyuheng?kind=password-login`, url), {
      method: "POST",
      body: JSON.stringify({
        password: "123456",
      }),
    })
  ).json()

  expect(typeof token).toEqual("string")

  let revision = ""

  {
    // The `token` can read user data.

    const response = await fetch(new URL(`users/xieyuheng?kind=data`, url), {
      method: "GET",
      headers: {
        authorization: `token ${token}`,
      },
    })

    expect(response.ok).toEqual(true)

    const gotten = await response.json()

    expect(gotten.name).toEqual("Xie Yuheng")

    revision = gotten["@revision"]
  }

  {
    // The `token` can update user data.

    const response = await fetch(new URL(`users/xieyuheng`, url), {
      method: "PATCH",
      headers: {
        authorization: `token ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": revision,
        name: "谢宇恒",
      }),
    })

    expect(response.ok).toEqual(true)

    const patched = await response.json()

    expect(patched.name).toEqual("谢宇恒")

    revision = patched["@revision"]
  }

  {
    // The `token` can delete user data.

    const response = await fetch(new URL(`users/xieyuheng`, url), {
      method: "DELETE",
      headers: {
        authorization: `token ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": revision,
      }),
    })

    expect(response.ok).toEqual(true)
  }

  {
    const response = await fetch(new URL(`users/xieyuheng`, url), {
      method: "GET",
      headers: {
        authorization: `token ${token}`,
      },
    })

    expect(response.status).toEqual(404)
  }
})
