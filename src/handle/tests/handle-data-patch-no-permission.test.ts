import { expect, test } from "vitest"
import { dataCreate } from "../../db"
import { allOperations, readOperations } from "../../operation"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "./prepareTestServer"

test("handle-data-patch-no-permission", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  await dataCreate(db, "users/xieyuheng/.login", {
    permissions: {
      "users/*": readOperations,
      "users/xieyuheng/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xieyuheng/.login",
  })

  let authorization = `token ${tokenName}`

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

  await dataCreate(db, "users/xyh/.login", {
    permissions: {
      "users/*": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await tokenCreate(db, {
    issuer: "users/xyh/.login",
  })

  authorization = `token ${tokenNameXYH}`

  // read is ok.

  expect(
    (
      await (
        await fetch(new URL(`users/xieyuheng`, url), {
          method: "GET",
          headers: {
            authorization,
          },
        })
      ).json()
    ).username,
  ).toEqual("xieyuheng")

  // write is not ok

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, url), {
        method: "PATCH",
        headers: {
          authorization,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          "@revision": created["@revision"],
          name: "谢宇恒",
        }),
      })
    ).status,
  ).toEqual(401)

  // delete is like write

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, url), {
        method: "DELETE",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
