import { assert, assertEquals } from "asserts";
import { resolve } from "path";
import { db } from "./utils.ts";
import * as UUID from "uuid";

Deno.test("create w/ uuid", async () => {
  const created = await db.create("users", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  });

  const [_prefix, uuid] = created["@id"].split("/");
  assert(UUID.validate(uuid));

  {
    const gotten = await db.get(created["@id"]);
    assertEquals(gotten, created);
    assert(gotten);
    await db.delete(gotten["@id"]);
  }
});
