---
title: kind=directory
---

## POST {directory}?kind=directory

Create a directory.

For example:

```
POST users/xieyuheng/public/contents?kind=directory
```

## GET {directory}?kind=directory

Read a directory's direct subdirectories and files.

For example:

```
GET users/xieyuheng/public/contents?kind=directory
```

Results:

```
[
  {
    "kind": "Directory",
    "path": "users/xieyuheng/public/contents/ai"
  },
  {
    "kind": "Directory",
    "path": "users/xieyuheng/public/contents/quotes"
  },
  {
    "kind": "File",
    "path": "users/xieyuheng/public/contents/debug.md",
    "size": 1321,
    "createdAt": 1695608364554.853,
    "updatedAt": 1695608364554.853
  },
  {
    "kind": "File",
    "path": "users/xieyuheng/public/contents/hello.md",
    "size": 3,
    "createdAt": 1695608364554.853,
    "updatedAt": 1695608364554.853
  },
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
GET users/xieyuheng/public/contents?kind=directory&recursive
```

## DELETE {directory}?kind=directory

Delete a directory recursively.

For example:

```
DELETE users/xieyuheng/public/contents?kind=directory
```
