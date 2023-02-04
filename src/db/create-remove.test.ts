import assert from "node:assert/strict"
import test from "node:test"
import * as UUID from "uuid"
import * as Db from "."
import { db } from "./db"

test("create-remove", async () => {
  const created = await Db.create(db, "users", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  const [_prefix, uuid] = created["@id"].split("/")
  assert(UUID.validate(uuid))
  assert.deepStrictEqual(await Db.get(db, created["@id"]), created)

  await Db.remove(db, created["@id"])
  assert.deepStrictEqual(await Db.get(db, created["@id"]), undefined)
})
