import { expect, test } from "vitest"
import { PathEntry } from "../../resources/directory/PathEntry"
import { prepareTestServer } from "../prepareTestServer"

test("directory-get-recursive", async ({ task }) => {
  const { url, authorization } = await prepareTestServer(task)

  {
    const response = await fetch(new URL(`?kind=directory`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const results = await response.json()
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(false)
  }

  await fetch(new URL(`users/1`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  })

  const response = await fetch(new URL(`?kind=directory&recursive`, url), {
    method: "GET",
    headers: {
      authorization,
    },
  })
  const results = await response.json()
  expect(
    Boolean(results.find(({ path }: PathEntry) => path === "users")),
  ).toEqual(true)
  expect(
    Boolean(results.find(({ path }: PathEntry) => path === "users/1")),
  ).toEqual(true)
})
