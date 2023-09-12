---
title: Intro
---

What if we use file system as database?

I mean a suite of protocols about
implementing database concepts in file system,
including a suite of HTTP API which can
read and write data represented in file system.

What is a protocol?

The most beautiful definition I know of is by Pieter Hintjens:

> A protocol is a kind of contract, an agreement that lets different
> teams in different times and places write code that is guaranteed to
> work together.
>
> Code that can work together is called interoperable.
>
> -- Pieter Hintjens

In a sense, "file system as database"
is actually what URL and HTTP is designed for
(although people had not yet discovered JSON at that time).

> It is tempting to think of resource identifiers as remote file
> system pathnames and of representations as being a copy of the
> contents of such files. In fact, that is how many resources are
> implemented. However, there are no such limitations in practice.
>
> -- [RFC 9110 -- HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).

A resource identifier is a URL that denotes a resource,
and a representation of resource is a concrete format that programmers can work with.

We see that file system,
with it's pathnames and files,
is both the inspiration and the archetype of such system,
and it is also the way many HTTP servers end up been implemented
specially at the early days of HTTP.

Nowaday people use relational database and SQL to implement HTTP API,
but the most used relations between SQL data
are the _one-to-one "has one"_ relation
and the _one-to-many "has many"_ relation,
which are most naturally expressed by nested directories.

For example:

- A user _has many_ projects,
  so we give each user a `projects` subdirectory:

  ```
  /users/*/projects/*
  ```

- A user _has one_ config,
  so we give each user a `config` subdirectory:

  ```
  /users/*/config
  ```

  We might also just let `config` be a property of `user` data,
  as people might do in some document database.

When designing a tool (such as API and formal language syntax),
we should _optimize for the most used use case_.
Thus using file system as database can be viewed as
optimizing for "has one" and "has many" relations.
The _many-to-many_ relation, which is about graph instead of tree,
can still be implemented by indexes,
just like how normal relational databases do.
Since we are optimizing our tool for the most used use case,
the tool feels very handy and easy to understand.

_What if we use file system as database?_

It feels like an idea worth exploring.

Before we begin, let's solve the most import problem first.

- **Problem 0:** How should we name this project?

- **Solution 0:** This project is about using file system as database.

  How about **FiDB**?

  **Fi**le system as **DB**!

I kinda like it already :)

## Source Code

The source code of this **FiDB** project is on [GitHub](https://github.com/fidb-official/fidb), and the source code of this manual is in the `docs/` directory of the repo.

This manual is available
both [in the form of a manual](https://readonly.link/manuals/https://cdn.fidb.app/docs/manual.json)
and [in the form of a book](https://readonly.link/books/https://cdn.fidb.app/docs/book.json).

Welcome feedback.
