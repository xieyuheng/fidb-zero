import { expect, test } from "vitest"
import { api } from "../.."
import { readOperations } from "../../models/permission"
import { dataCreate } from "../../resources"
import { tokenCreateRandom } from "../../system-resources/token"
import { prepareTestServer } from "../prepareTestServer"

test("data-can-not-access-system-path", async ({ task }) => {
  const { db, ctx } = await prepareTestServer(task)

  await dataCreate(db, "test-token-issuers/all-read", {
    permissions: {
      "**": readOperations,
    },
  })

  const tokenName = await tokenCreateRandom(db, {
    issuer: ".test-token-issuer",
  })

  {
    const error = await api.errorOrFail(() =>
      api.dataGet(ctx, `.tokens/${tokenName}`),
    )

    expect(error.statusCode).toEqual(401)
  }
})
