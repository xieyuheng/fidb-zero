import { expect, test } from "vitest"
import * as Db from "."
import { prepareTest } from "./test-utils"

test("create-put-delete", async () => {
  const { db } = await prepareTest()

  const putted = await Db.create(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  await Db.delete(db, putted)
  expect(await Db.get(db, "users/xieyuheng"), undefined).toEqual(undefined)
})
