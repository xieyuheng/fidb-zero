import { expect, test } from "vitest"
import type { PathEntry } from "../../db/PathEntry"
import { prepareTestServer } from "./prepareTestServer"

test("server-create-directory", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  {
    const response = await fetch(`${url}/?kind=directory`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(false)
  }

  await fetch(`${url}/users/?kind=directory`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
  })

  {
    const response = await fetch(`${url}/?kind=directory`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(true)
  }
})
