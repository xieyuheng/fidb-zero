import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-no-permission-to-read", async ({ meta }) => {
  {
    const { url, authorization } = await prepareTestServer({
      ...meta,
      permissions: {
        "users/xieyuheng/**": "readwrite",
      },
    })

    const created = await (
      await fetch(`${url}/users/xieyuheng`, {
        method: "POST",
        headers: {
          authorization,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: "xieyuheng",
          name: "Xie Yuheng",
        }),
      })
    ).json()

    expect(created.name).toEqual("Xie Yuheng")
    expect(
      await (
        await fetch(`${url}/users/xieyuheng`, {
          method: "GET",
          headers: {
            authorization,
          },
        })
      ).json(),
    ).toEqual(created)
  }

  {
    const { url, authorization } = await prepareTestServer({
      ...meta,
      permissions: {
        "users/xyh/**": "readwrite",
      },
    })

    expect(
      (
        await fetch(`${url}/users/xieyuheng`, {
          method: "GET",
          headers: {
            authorization,
            "content-type": "application/json",
          },
        })
      ).status,
    ).toEqual(401)
  }
})
