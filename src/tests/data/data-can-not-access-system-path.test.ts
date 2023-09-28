import { expect, test } from "vitest"
import { readOperations } from "../../permission"
import { dataCreate } from "../../resources"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "../prepareTestServer"

test("data-can-not-access-system-path", async ({ task }) => {
  const { url, db, authorization } = await prepareTestServer(task)

  await dataCreate(db, "test-token-issuers/all-read", {
    permissions: {
      "**": readOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "test-token-issuers/all-read",
  })

  {
    const response = await fetch(new URL(`.tokens/${tokenName}`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })

    expect(response.status).toEqual(401)
  }
})
