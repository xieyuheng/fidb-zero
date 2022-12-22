import { assertEquals } from "asserts";
import { resolve } from "path";
import { Database } from "../database/index.ts";

const filename = new URL(import.meta.url).pathname;

const db = new Database({
  path: resolve(filename, "../../../databases/test"),
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

  assertEquals(patched.name, "谢宇恒");

  {
    const gotten = await db.get("users/xieyuheng");
    assertEquals(gotten, patched);
  }

  await db.delete("users/xieyuheng");

  {
    const gotten = await db.get("users/xieyuheng");
    assertEquals(gotten, undefined);
  }
});

Deno.test("all", async () => {
  await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  });

  await db.put("users/cicada-lang", {
    username: "cicada-lang",
    name: "Cicada Language",
  });

  await db.put("users/fidb", {
    username: "fidb",
    name: "FiDB",
  });

  {
    const results = [];
    for await (const data of db.all("users")) {
      results.push(data);
    }

    assertEquals(results.length, 3);
  }

  for await (const data of db.all("users")) {
    await db.delete(data["@id"]);
  }

  {
    const results = [];
    for await (const data of db.all("users")) {
      results.push(data);
    }

    assertEquals(results.length, 0);
  }
});

Deno.test("find", async () => {
  await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
    country: "China",
  });

  await db.put("users/cicada-lang", {
    username: "cicada-lang",
    name: "Cicada Language",
  });

  await db.put("users/fidb", {
    username: "fidb",
    name: "FiDB",
    country: "China",
  });

  {
    const results = [];
    for await (const data of db.find("users", {
      properties: {
        country: "China",
      },
    })) {
      results.push(data);
    }

    assertEquals(results.length, 2);
  }

  for await (const data of db.all("users")) {
    await db.delete(data["@id"]);
  }
});
