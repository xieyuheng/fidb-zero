import { expect, test } from "vitest"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("data-crud", async ({ task }) => {
  const { url, ctx, authorization } = await prepareTestServer(task)

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

  expect(await api.getData(ctx, `users/xieyuheng`)).toEqual(created)

  const putted = await (
    await fetch(new URL(`users/xieyuheng`, url), {
      method: "PUT",
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": created["@revision"],
        name: "谢宇恒",
      }),
    })
  ).json()

  expect(putted.username).toEqual(undefined)
  expect(putted.name).toEqual("谢宇恒")
  expect(await api.getData(ctx, `users/xieyuheng`)).toEqual(putted)

  const patched = await (
    await fetch(new URL(`users/xieyuheng`, url), {
      method: "PATCH",
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": putted["@revision"],
        username: "xyh",
      }),
    })
  ).json()

  expect(patched.username).toEqual("xyh")
  expect(patched.name).toEqual("谢宇恒")
  expect(await api.getData(ctx, `users/xieyuheng`)).toEqual(patched)

  await fetch(new URL(`users/xieyuheng`, url), {
    method: "DELETE",
    headers: {
      authorization,
    },
    body: JSON.stringify({
      "@revision": patched["@revision"],
    }),
  })

  expect(await api.getData(ctx, `users/xieyuheng`)).toEqual(undefined)
})
