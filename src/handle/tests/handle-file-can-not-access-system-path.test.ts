import { expect, test } from "vitest"
import { readOperations } from "../../operation"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "./prepareTestServer"

test("handle-file-can-not-access-system-path", async ({ meta }) => {
  const { url, db, authorization } = await prepareTestServer(meta)

  const token = await tokenCreate(db, {
    permissions: {
      "**": readOperations,
    },
  })

  {
    const response = await fetch(
      new URL(`.tokens/${token}/index.json?kind=file`, url),
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
