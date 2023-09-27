import { expect, test } from "vitest"
import { randomTokenName } from "../../token/randomTokenName"
import { prepareTestServer } from "../prepareTestServer"

test("file-can-not-access-system-path", async ({ task }) => {
  const { url, db, authorization } = await prepareTestServer(task)

  const tokenName = randomTokenName()

  {
    const response = await fetch(
      new URL(`.tokens/${tokenName}/index.json?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    expect(response.status).toEqual(401)
  }
})
