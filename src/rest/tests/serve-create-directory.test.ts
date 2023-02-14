import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-create-directory", async () => {
  const { url, authorization } = await serveTestDb()

  {
    const response = await fetch(`${url}/?kind=list`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const { directories } = await response.json()
    expect(directories.length).toEqual(0)
  }

  await fetch(`${url}/users/?kind=directory`, {
    method: "POST",
    headers: { authorization },
  })

  {
    const response = await fetch(`${url}/?kind=list`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const { directories } = await response.json()
    expect(directories.length).toEqual(1)
    expect(directories.includes("users")).toEqual(true)
  }
})
