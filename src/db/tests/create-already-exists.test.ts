import { expect, test } from "vitest"
import * as Db from "../../db"
import { AlreadyExists } from "../../errors/AlreadyExists"
import { prepareTestDb } from "./prepareTestDb"

test("create-already-exists", async () => {
  const db = await prepareTestDb()

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
