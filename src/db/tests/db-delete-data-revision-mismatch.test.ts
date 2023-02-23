import { expect, test } from "vitest"
import * as Db from ".."
import { randomRevision } from "../../data"
import { RevisionMismatch } from "../../errors/RevisionMismatch"
import { prepareTestDb } from "./prepareTestDb"

test("db-delete-data-revision-mismatch", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  await Db.createData(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.deleteData(db, "users/xieyuheng", {
      "@revision": randomRevision(),
      name: "谢宇恒",
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
