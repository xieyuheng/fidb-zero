import { expect, test } from "vitest"
import * as Db from "."
import { db } from "./test-utils"

test("put-delete", async () => {
  const putted = await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  await Db.del(db, "users/xieyuheng")
  expect(await Db.get(db, "users/xieyuheng"), undefined).toEqual(undefined)
})
