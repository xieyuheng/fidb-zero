import { expect, test } from "vitest"
import { randomTokenName } from "../../token/randomTokenName"
import { prepareTestServer } from "../prepareTestServer"

test("file-can-not-access-system-path", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const tokenName = randomTokenName()

  {
    const response = await fetch(
      new URL(`.tokens/${tokenName}/index.json?kind=file`, ctx.url),
      {
        method: "GET",
        headers: {
          authorization: ctx.authorization,
        },
      },
    )

    expect(response.status).toEqual(401)
  }
})
