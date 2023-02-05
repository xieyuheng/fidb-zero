import { expect, test } from "vitest"
import * as Db from "."
import { randomRevision } from "../data"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { prepareTest } from "./test-utils"

test("delete-revision-mismatch", async () => {
  const { db } = await prepareTest()

  await Db.put(db, {
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
