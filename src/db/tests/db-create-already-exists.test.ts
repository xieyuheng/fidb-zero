import { expect, test } from "vitest"
import * as Db from "../../db"
import { AlreadyExists } from "../../errors/AlreadyExists"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-already-exists", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  const created = await Db.create(db, `users/${crypto.randomUUID()}`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, created["@path"])).toEqual(created)

  await expect(
    Db.create(db, created["@path"], {
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(AlreadyExists)
})
