---
title: Data Table
---

To implement the idea of using file system as database,
we must first answer the question about
the familiar concept of _data table_.

- **Problem 1.1:** How should we represent data table in file system?

- **Solution 1.1.A:** Using a directory of JSON files to represent a table,
  where each JSON file represents a row of the table.

  For example:

  ```
  users/xieyuheng.json
  users/readonlylink.json
  users/mimor.json
  ```

This seems is the most simple solution, but we can not use it,
because we want to use subdirectory relation
to represent "has one" and "has many" relations,
while a file can not have any subdirectory at all.

- **Solution 1.1.B:** Using a directory of directories to represent a table,
  where each subdirectory contains one JSON file named `index.json`
  that represents a row of the table.

  For example:

  ```
  users/xieyuheng/index.json
  users/readonlylink/index.json
  users/mimor/index.json
  ```

  Let's call these `index.json` _data files_.

  And the name of the subdirectory relative to the root of the database
  is viewed as the primary key of the row.

  For example:

  ```
  xieyuheng
  readonlylink
  mimor
  ```

We talked about representing "has one" and "has many" relations
many many times already, let's articulate it as a problem
and solve it once for all.

- **Problem 1.2:** How should we represent "has one" and "has many" relations in file system?

- **Solution 1.2:** The data belong to another data,
  should be represented as subdirectory belong to the corresponding directory.

  For example, a user _has many_ projects,
  then each user has a `projects` subdirectory.

  The pattern of directories will be:

  ```
  users/*/projects/*/index.json
  ```

  Concrete examples:

  ```
  users/xieyuheng/index.json
  users/xieyuheng/projects/inner/index.json
  users/xieyuheng/projects/pomodoro/index.json
  users/xieyuheng/projects/learn-x/index.json
  users/xieyuheng/projects/cell-complex/index.json

  users/readonlylink/index.json
  users/readonlylink/projects/x-node/index.json
  users/readonlylink/projects/x-markdown/index.json
  ```

  For another example, a user _has one_ config,
  thus each user has a `config` subdirectory.

  The pattern of directories will be:

  ```
  users/*/config/index.json
  ```

  Concrete examples:

  ```
  users/xieyuheng/index.json
  users/xieyuheng/config/index.json

  users/readonlylink/index.json
  users/readonlylink/config/index.json
  ```

In an implementation, there might be functions
that operate on those data files.
For example, in [my NodeJs implementation](github.com/fidb-official/fidb),
I have:

```ts
dataCreate(db: Database, path: string, input: JsonObject): Promise<Data>
dataGetOrFail(db: Database, path: string): Promise<Data>
dataGet(db: Database, path: string): Promise<Data | undefined>
dataPut(db: Database, path: string, input: JsonObject): Promise<Data>
dataPatch(db: Database, path: string, input: JsonObject): Promise<Data>
dataDelete(db: Database, path: string, input: JsonObject): Promise<void>
```

Now, whenever I want to save some data,
I just put them in data files,
and use these functions to operate on them.
