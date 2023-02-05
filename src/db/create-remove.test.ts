import assert from "node:assert/strict"
import * as UUID from "uuid"
import { test } from "vitest"
import * as Db from "../db"
import { db } from "./test-utils"

test("create-remove", async () => {
  const created = await Db.create(db, "users", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  const [_prefix, uuid] = created["@id"].split("/")
  assert(UUID.validate(uuid))
  assert.deepStrictEqual(await Db.get(db, created["@id"]), created)

  await Db.del(db, created["@id"])
  assert.deepStrictEqual(await Db.get(db, created["@id"]), undefined)
})
