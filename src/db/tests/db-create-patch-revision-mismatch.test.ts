import { expect, test } from "vitest"
import { randomRevision } from "../../data"
import * as Db from "../../db"
import { RevisionMismatch } from "../../errors/RevisionMismatch"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-patch-revision-mismatch", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  await Db.create(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.patch(db, "users/xieyuheng", {
      "@revision": randomRevision(),
      name: "谢宇恒",
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
