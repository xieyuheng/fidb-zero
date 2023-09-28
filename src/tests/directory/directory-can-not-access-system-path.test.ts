import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer"

test("directory-can-not-access-system-path", async ({ task }) => {
  const { url, authorization } = await prepareTestServer(task)

  {
    const response = await fetch(new URL(`.tokens?kind=directory`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })

    expect(response.status).toEqual(401)
  }
})
