import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("data-crud", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  expect(await api.dataHas(ctx, `users/xieyuheng`)).toEqual(false)

  const created = await api.dataCreate(ctx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
    address: {
      country: "China",
      city: "YinChuan",
    },
  })

  expect(created.name).toEqual("Xie Yuheng")

  expect(await api.dataHas(ctx, `users/xieyuheng`)).toEqual(true)
  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(created)

  const putted = await api.dataPut(ctx, `users/xieyuheng`, {
    "@revision": created["@revision"],
    name: "谢宇恒",
    address: {
      country: "China",
      city: "GuangZhou",
    },
  })

  expect(putted.username).toEqual(undefined)
  expect(putted.name).toEqual("谢宇恒")
  expect(putted.address).toEqual({
    country: "China",
    city: "GuangZhou",
  })
  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(putted)

  const patched = await api.dataPatch(ctx, `users/xieyuheng`, {
    "@revision": putted["@revision"],
    username: "xyh",
    address: {
      city: "ShenZhen",
    },
  })

  expect(patched.username).toEqual("xyh")
  expect(patched.name).toEqual("谢宇恒")
  expect(patched.address).toEqual({
    country: "China",
    city: "ShenZhen",
  })
  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(patched)

  await api.dataDelete(ctx, `users/xieyuheng`, {
    "@revision": patched["@revision"],
  })

  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(undefined)
})
