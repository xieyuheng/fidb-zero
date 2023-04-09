import { expect, test } from "vitest"
import { tokenCreate } from "../../token"
import { allOperations } from "../../token/Operation"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-data-get-no-permission", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  let authorization = `token ${await tokenCreate(db, {
    permissions: {
      "users/xieyuheng/**": allOperations,
    },
  })}`

  const created = await (
    await fetch(new URL(`users/xieyuheng`, url), {
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
      await fetch(new URL(`users/xieyuheng`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).json(),
  ).toEqual(created)

  authorization = `token ${await tokenCreate(db, {
    permissions: {
      "users/xyh/**": allOperations,
    },
  })}`

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
