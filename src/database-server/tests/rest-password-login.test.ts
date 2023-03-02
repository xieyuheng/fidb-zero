import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-password-login", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  db.config = {
    name: "rest-password-register",
    description: "",
    authDirectories: {
      users: {
        permissions: ["create", "read", "update", "delete"],
      },
    },
  }

  const created = await (
    await fetch(`${url}/users/xieyuheng?kind=password-register`, {
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
    const token = await (
      await fetch(`${url}/users/xieyuheng?kind=password-login`, {
        method: "POST",
        body: JSON.stringify({
          password: "123456",
        }),
      })
    ).json()

    // The `token` can read user data.

    const gotten = await (
      await fetch(`${url}/users/xieyuheng?kind=data`, {
        method: "GET",
        headers: {
          authorization: `token ${token}`,
        },
      })
    ).json()

    expect(gotten.name).toEqual("Xie Yuheng")

    // The `token` can update user data.

    const patched = await (
      await fetch(`${url}/users/xieyuheng`, {
        method: "PATCH",
        headers: {
          authorization: `token ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          "@revision": gotten["@revision"],
          name: "谢宇恒",
        }),
      })
    ).json()

    expect(patched.name).toEqual("谢宇恒")

    // The `token` can delete user data.

    await fetch(`${url}/users/xieyuheng`, {
      method: "DELETE",
      headers: {
        authorization: `token ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": patched["@revision"],
      }),
    })

    expect(
      (
        await fetch(`${url}/users/xieyuheng`, {
          method: "GET",
          headers: {
            authorization: `token ${token}`,
          },
        })
      ).status,
    ).toEqual(404)
  }
})
