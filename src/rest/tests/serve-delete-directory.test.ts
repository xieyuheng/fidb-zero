import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-delete-directory", async () => {
  const { url, authorization } = await serveTestDb()

  await fetch(`${url}/users?kind=directory`, {
    method: "POST",
    headers: {
      authorization,
    },
  })

  {
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(true)
  }

  await fetch(`${url}/users?kind=directory`, {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  {
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(false)
  }
})
