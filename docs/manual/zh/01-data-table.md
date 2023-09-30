---
title: 数据表
---

To implement the idea of FiDB,
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
but a file CAN NOT have any subdirectories at all.

- **Solution 1.1.B:** Using a directory of directories to represent a table,
  where each subdirectory contains one JSON file named `index.json`
  that represents a row of the table.

  For example:

  ```
  users/xieyuheng/index.json
  users/readonlylink/index.json
  users/mimor/index.json
  ```

  We will call `users/xieyuheng/index.json` a _data file_.

  And the path of the subdirectory relative to the root of the database
  is viewed as the _primary key_ of the row.

  For example the primary keys of the above data files are:

  ```
  users/xieyuheng
  users/readonlylink
  users/mimor
  ```

  We will use paths like `users/xieyuheng` to refer to the data file,

We talked about representing "has one" and "has many" relations
many times already, let's articulate it as a problem
and solve it once for all.

- **Problem 1.2:** How should we represent "has one" and "has many" relations in file system?

- **Solution 1.2:** The data belong to another data,
  should be represented as subdirectory
  belong to the corresponding directory.

  For example, a user _has many_ projects,
  thus each user has a `projects` subdirectory.

  Suppose the pattern of data files for `users` is:

  ```
  users/{user}/index.json
  ```

  Example data files of `users`:

  ```
  users/readonlylink/index.json
  users/xieyuheng/index.json
  ```

  The pattern of data files for `projects` would be:

  ```
  users/{user}/projects/{project}/index.json
  ```

  Example data files of `projects`:

  ```
  users/xieyuheng/projects/inner/index.json
  users/xieyuheng/projects/pomodoro/index.json
  users/readonlylink/projects/x-node/index.json
  users/readonlylink/projects/x-markdown/index.json
  ```

  For another example, a user _has one_ config,
  thus each user has a `config` subdirectory.

  The pattern of data files for `config` is:

  ```
  users/{user}/config/index.json
  ```

  Example data files of `config`:

  ```
  users/xieyuheng/config/index.json
  users/readonlylink/config/index.json
  ```
