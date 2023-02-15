import { expect, test } from "vitest"
import { randomRevision } from "../../data"
import * as Db from "../../db"
import { RevisionMismatch } from "../../errors/RevisionMismatch"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-put-revision-mismatch", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  const created = await Db.create(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.put(db, created["@path"], {
      ...created,
      "@revision": randomRevision(),
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
