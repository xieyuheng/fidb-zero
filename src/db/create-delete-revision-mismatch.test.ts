import { expect, test } from "vitest"
import { randomRevision } from "../data"
import * as Db from "../db"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { prepareTest } from "./test-utils"

test("create-delete-revision-mismatch", async () => {
  const { db } = await prepareTest()

  await Db.create(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.delete(db, {
      "@id": "users/xieyuheng",
      "@revision": randomRevision(),
      name: "谢宇恒",
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
