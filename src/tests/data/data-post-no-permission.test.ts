import { expect, test } from "vitest"
import { allOperations, readOperations } from "../../permission"
import { createData } from "../../resources"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "../prepareTestServer"

test("data-post-no-permission", async ({ task }) => {
  const { url, db } = await prepareTestServer(task)

  await createData(db, "users/xyh/.login-token-issuer", {
    permissions: {
      "users/*/**": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xyh/.login-token-issuer",
  })

  const authorization = `token ${tokenName}`

  expect(
    (
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
    ).status,
  ).toEqual(401)
})
