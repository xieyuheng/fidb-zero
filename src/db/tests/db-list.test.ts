import { expect, test } from "vitest"
import * as Db from ".."
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import type { PathEntry } from "../PathEntry"
import { prepareTestDb } from "./prepareTestDb"

test("db-list", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.list(db, "", { page: 1, size: 2 }),
    )

    expect(pathEntries.length).toEqual(0)
  }

  await Db.create(db, "users/1", {})
  await Db.create(db, "users/2", {})
  await Db.create(db, "users/3", {})

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.list(db, "", { page: 1, size: 2 }),
    )

    expect(pathEntries.length).toEqual(1)
    expect(
      Boolean(pathEntries.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(true)
  }

  await Db.create(db, "posts/1", {})
  await Db.create(db, "posts/2", {})

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.list(db, "", { page: 1, size: 2 }),
    )

    expect(pathEntries.length).toEqual(2)
    expect(
      Boolean(pathEntries.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(true)
    expect(
      Boolean(pathEntries.find(({ path }: PathEntry) => path === "posts")),
    ).toEqual(true)
  }

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.list(db, "", { page: 1, size: 1 }),
    )

    expect(pathEntries.length).toEqual(1)
    expect(
      Boolean(
        pathEntries.find(
          ({ path }: PathEntry) => path === "users" || path === "posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.list(db, "", { page: 2, size: 1 }),
    )

    expect(pathEntries.length).toEqual(1)
    expect(
      Boolean(
        pathEntries.find(
          ({ path }: PathEntry) => path === "users" || path === "posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.list(db, "", { page: 3, size: 1 }),
    )

    expect(pathEntries.length).toEqual(0)
  }
})
