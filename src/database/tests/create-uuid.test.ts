import assert from "node:assert/strict"
import test from "node:test"
import * as UUID from "uuid"
import { db } from "./utils"

test("create w/ uuid", async () => {
  const created = await db.create("users", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  const [_prefix, uuid] = created["@id"].split("/")
  assert(UUID.validate(uuid))

  {
    const gotten = await db.get(created["@id"])
    assert.deepStrictEqual(gotten, created)
    assert(gotten)
  }

  {
    await db.delete(created["@id"])
    const gotten = await db.get(created["@id"])
    assert.deepStrictEqual(gotten, undefined)
  }
})
