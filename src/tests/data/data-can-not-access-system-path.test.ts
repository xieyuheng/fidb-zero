import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("data-can-not-access-system-path", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  {
    const error = await api.errorOrFail(() =>
      api.dataGet(ctx, `.guest-token-issuer`),
    )

    expect(error.statusCode).toEqual(401)
  }
})
