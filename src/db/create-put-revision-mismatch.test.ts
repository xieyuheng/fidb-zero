import { expect, test } from "vitest"
import { randomRevision } from "../data"
import * as Db from "../db"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { prepareTestDb } from "./test-utils"

test("create-put-revision-mismatch", async () => {
  const db = await prepareTestDb()

  await Db.create(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.put(db, {
      "@id": "users/xieyuheng",
      "@revision": randomRevision(),
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
