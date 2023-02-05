import { expect, test } from "vitest"
import * as Db from "."
import { prepareTest } from "./test-utils"

test("put-delete", async () => {
  const { db } = await prepareTest()

  const putted = await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  await Db.delete(db, "users/xieyuheng")
  expect(await Db.get(db, "users/xieyuheng"), undefined).toBe(undefined)
})
