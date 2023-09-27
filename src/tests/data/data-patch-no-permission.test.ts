import { expect, test } from "vitest"
import { allOperations, readOperations } from "../../permission"
import { createData } from "../../resources"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "../prepareTestServer"

test("data-patch-no-permission", async ({ task }) => {
  const { url, db } = await prepareTestServer(task)

  await createData(db, "users/xieyuheng/.login-token-issuer", {
    permissions: {
      "users/*": readOperations,
      "users/xieyuheng/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xieyuheng/.login-token-issuer",
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

  await createData(db, "users/xyh/.login-token-issuer", {
    permissions: {
      "users/*": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await tokenCreate(db, {
    issuer: "users/xyh/.login-token-issuer",
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
