import { expect, test } from "vitest"
import { allOperations } from "../../permission"
import { dataCreate } from "../../resources"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "../prepareTestServer"

test("data-get-no-permission", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  await dataCreate(db, "users/xieyuheng/.login", {
    permissions: {
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
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await tokenCreate(db, {
    issuer: "users/xyh/.login",
  })

  authorization = `token ${tokenNameXYH}`

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
