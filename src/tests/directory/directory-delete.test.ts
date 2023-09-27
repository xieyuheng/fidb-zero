import { expect, test } from "vitest"
import { PathEntry } from "../../resources/directory/PathEntry"
import { prepareTestServer } from "../prepareTestServer"

test("directory-delete", async ({ task }) => {
  const { url, authorization } = await prepareTestServer(task)

  await fetch(new URL(`users?kind=directory`, url), {
    method: "POST",
    headers: {
      authorization,
    },
  })

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
    ).toEqual(true)
  }

  await fetch(new URL(`users?kind=directory`, url), {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

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
})
