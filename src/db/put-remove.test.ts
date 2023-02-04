import assert from "node:assert/strict"
import test from "node:test"
import * as Db from "../db"
import { db } from "./db"

test("put-remove", async () => {
  const putted = await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  assert.deepStrictEqual(await Db.get(db, "users/xieyuheng"), putted)

  await Db.remove(db, "users/xieyuheng")
  assert.deepStrictEqual(await Db.get(db, "users/xieyuheng"), undefined)
})
