---
title: Intro
---

What if we use file system as database?

I want a set of reusable solutions to implement database concepts just
by the file system, and HTTP APIs which can read and write data
represented as data files.

In a sense, "file system as database"
is actually what URL and HTTP are designed for.
In the HTTP Semantics section of
[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html),
it says:

> It is tempting to think of resource identifiers as remote file
> system pathnames and of representations as being a copy of the
> contents of such files. In fact, that is how many resources are
> implemented. However, there are no such limitations in practice.

A resource identifier links to a resource.
If we view a resource as a directory or a file,
the abstract idea of resource identifier becomes much more concrete.
We see that file system, with it's pathnames and files, is both the
inspiration and the archetype of HTTP resource.

Nowaday people use relational database and SQL to implement HTTP API,
but the most used relations between SQL data
are the one-to-one "has one" relation
and the one-to-many "has many" relation,
which are most naturally expressed by nested directories.

For example:

- A user _has many_ projects,
  so we give each user a `projects` subdirectory:

  ```
  users/{user}/projects/{project}
  ```

- A user _has one_ config,
  so we give each user a `config` subdirectory:

  ```
  users/{user}/config
  ```

  We might also just let `config` be a property of `user` data,
  as people might do in some document database.

When designing a tool, such as HTTP API and syntax of a programming
language, we should optimize our design for the most used use case.
Thus using file system as database can be viewed as optimizing for
"has one" and "has many" relations.  Since we are optimizing our tool
for the most used use case, the tool feels more handy and easier to
understand.  The many-to-many relation, can still be implemented by
indexes, just like how a normal relational database would do.

> What if we use file system as database?

It feels like an idea worth exploring.

I will call this project **FiDB**,
homepage is at [example.com](https://example.com).

The source code is [available on GitHub](https://github.com/fidb-official/fidb),
and the source of this manual is in the `docs/` directory of the repository.

Welcome feedback.
