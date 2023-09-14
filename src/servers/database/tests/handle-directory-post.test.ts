import { expect, test } from "vitest"
import { PathEntry } from "../../../path-entry"
import { prepareTestServer } from "./prepareTestServer"

test("handle-directory-post", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

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
})
