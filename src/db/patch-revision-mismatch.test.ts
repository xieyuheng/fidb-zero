import { expect, test } from "vitest"
import * as Db from "."
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { prepareTest } from "./test-utils"
import { randomRevision } from "./utils/randomRevision"

test("patch-revision-mismatch", async () => {
  const { db } = await prepareTest()

  await Db.put(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.patch(db, {
      "@id": "users/xieyuheng",
      "@revision": randomRevision(),
      name: "谢宇恒",
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
