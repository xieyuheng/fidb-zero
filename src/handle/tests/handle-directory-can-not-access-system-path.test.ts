import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("handle-directory-can-not-access-system-path", async ({ meta }) => {
  const { url, db, authorization } = await prepareTestServer(meta)

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
