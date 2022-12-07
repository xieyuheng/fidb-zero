import { assertEquals } from "asserts";
import { resolve } from "path";
import { Database } from "../database/index.ts";

const filename = new URL(import.meta.url).pathname;

const db = new Database({
  path: resolve(filename, "../../../databases/mimor"),
});

Deno.test("CRUD", async () => {
  const putted = await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  });

  {
    const gotten = await db.get("users/xieyuheng");
    assertEquals(gotten, putted);
  }

  const patched = await db.patch("users/xieyuheng", {
    name: "谢宇恒",
  });


  {
    const gotten = await db.get("users/xieyuheng");
    assertEquals(gotten, patched);
  }

  // await db.delete("users/xieyuheng");
});
