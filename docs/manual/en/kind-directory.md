---
title: kind=directory
---

Since we are using file system as database
and we can operate on files,
we naturally also want to operate on directories.

- To **create** a directory, `POST` the path with query parameter `kind=directory`.

  For example:

  ```
  POST users?kind=directory
  ```

- To **read** a directory's direct subdirectories and files,
  `GET` the path with query parameter `kind=directory`.

  For example:

  ```
  GET users?kind=directory
  ```

  Results:

  ```
  [
    { "kind": "Directory", "path": "users/xieyuheng" },
    { "kind": "Directory", "path": "users/readonlylink" },
    ...
  ]
  ```

  The `kind` might be `"Directory"` or `"File"`,
  the `path` is relative to the root of the database
  (thus can be used as primarily key).

  The above request is not recursive,
  if we want list all nested subdirectories
  we can add `recursive` to the query:

  ```
  GET users?kind=directory&recursive
  ```

- To **delete** a directory recursively,
  `DELETE` the path with query parameter `kind=directory`.

  For example:

  ```
  DELETE users?kind=directory
  ```
