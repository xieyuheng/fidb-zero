---
title: Intro
---

What if we use file system as database?

I mean a suite of protocols about
implementing database concepts in file system,
including a suite of HTTP API which can
read and write data represented in file system.

What is a protocol?

The most beautiful definition I know is by Pieter Hintjens:

> A protocol is a kind of contract, an agreement that lets different
> teams in different times and places write code that is guaranteed to
> work together.
>
> Code that can work together is called interoperable.
>
> -- Pieter Hintjens

This is actually what URL and HTTP is designed for.

- Although people had not yet discovered JSON at that time.

> It is tempting to think of resource identifiers as remote file
> system pathnames and of representations as being a copy of the
> contents of such files. In fact, that is how many resources are
> implemented. However, there are no such limitations in practice.
>
> - [RFC 9110 -- HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).

Nowaday people use relational database and SQL,
but the most used relations between SQL data
are `has one` and `has many`,
which are most naturally expressed by nested directories.

For example:

- A user _has many_ posts,
  so we use the following directories:

  ```
  /users/*/posts/*
  ```

- A user _has one_ config,
  so we might use the following directories:

  ```
  /users/*/config
  ```

  Or we might just let `config` be a property of `user`,
  as people might do in some document database.

When designing a tool (such as API and formal language syntax),
we should _optimize for the most used use case_.
Thus using file system as database can be viewed as
optimizing for `has one` and `has many` relations.
The `many to many` relation can still be implemented by indexes,
just like normal relational database.
Since we optimized the tool for the most used use case,
the tool feels so handy and easy to understand.

What if we use file system as database?

It feels like an idea worth trying.
Let us explore how execatly can we implement this idea.

Before we begin, let's solve the most import problem first.

- **Problem 0:** How should we name this project?

- **Solution 0:** This project is about using file system as database,
  specially using the subdirectory relation to represent
  `has one` and `has many` relations between data.

  How about `FiDB`?

  **Fi**le system as **DB**!

I kinda like it already :)
