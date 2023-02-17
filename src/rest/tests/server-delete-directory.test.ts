import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-delete-directory", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(`${url}/users?kind=directory`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
  })

  {
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(true)
  }

  await fetch(`${url}/users?kind=directory`, {
    method: "DELETE",
    headers: {
      authorization,
      "content-type": "application/json",
    },
  })

  {
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(false)
  }
})
