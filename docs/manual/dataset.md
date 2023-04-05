---
title: Dataset
---

To implement the idea of using file system as database,
we must first answer the question about
the familiar concept of _table_.

Actually an hierarchy of concepts:

In SQL the hierarchy is:

```
database > table > row > column
```

In document database (like mongodb) the hierarchy is:

```
database > collection > document (JSON) > property
```

In our FiDB, we would like to use the following hierarchy:

```
database > dataset > data
```

Because we want to emphasize that

1. There are no duplicated data in a dataset.
2. The data in a dataset are unordered.

Just like the axioms of [mathematical set](<https://en.wikipedia.org/wiki/Set_(mathematics)>).

- **Problem 1:** How should we represent data table in file system?

- **Solution 1.0:** Using a directory of JSON files to represent a table,
  where each JSON file represents a row of the table,
  and the name of the file relative to the root of the database
  is viewed as the primary key of the row.

  For example:

  ```
  users/xieyuheng.json
  users/fidb.json
  ...
  ```

  The primary keys will be:

  ```
  xieyuheng.json
  fidb.json
  ...
  ```

This seems is the most simple solution, but we can not use it,
because we want to use subdirectory relation
to represent `has one` and `has many` relations,
while a file can not have any subdirectory at all.

- **Solution 1.1:** Using a directory of directories to represent a table,
  where each subdirectory contains one JSON file named `index.json`
  that represents a row of the table,
  and the name of the subdirectory relative to the root of the database
  is viewed as the primary key of the row.

  For example:

  ```
  users/xieyuheng/index.json
  users/fidb/index.json
  ...
  ```

  The primary keys will be:

  ```
  xieyuheng
  fidb
  ...
  ```

Note that, different from **Solution 1.0**,
in **Solution 1.1** a primary key does not have the `.json` file extension,
this is a good feature.

We talked about representing `has one` and `has many` relations
many many times already, let's articulate it as a problem
and solve it once for all.

By the way, the form of problem and solution is learned from a book called [Scalable C](https://readonly.link/books/https://books.readonly.link/scalable-c/book.json).

- **Problem 2:** How should we represent `has one` and `has many` relations in file system?

- **Solution 2:** TODO.