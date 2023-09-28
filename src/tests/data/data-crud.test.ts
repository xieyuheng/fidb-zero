import { expect, test } from "vitest"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("data-crud", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const created = await api.dataCreate(ctx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(created.name).toEqual("Xie Yuheng")

  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(created)

  const putted = await api.dataPut(ctx, `users/xieyuheng`, {
    "@revision": created["@revision"],
    name: "谢宇恒",
  })

  expect(putted.username).toEqual(undefined)
  expect(putted.name).toEqual("谢宇恒")
  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(putted)

  const patched = await api.dataPatch(ctx, `users/xieyuheng`, {
    "@revision": putted["@revision"],
    username: "xyh",
  })

  expect(patched.username).toEqual("xyh")
  expect(patched.name).toEqual("谢宇恒")
  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(patched)

  await api.dataDelete(ctx, `users/xieyuheng`, {
    "@revision": patched["@revision"],
  })

  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(undefined)
})
