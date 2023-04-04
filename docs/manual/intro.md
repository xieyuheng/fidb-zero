---
title: Intro
---

What if we use file system as database?

I mean a suite of HTTP API over file system,
which just do basic read and write
of data represented by JSON files.

This is actually what URL and HTTP is designed for.

> It is tempting to think of resource identifiers as remote file
> system pathnames and of representations as being a copy of the
> contents of such files. In fact, that is how many resources are
> implemented. However, there are no such limitations in practice.
>
> - [RFC 9110 -- HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).

Nowaday people use relational database and SQL,
but the most used relations between SQL tables
are `has one` and `has many`,
which are must naturally expressed by nested directories.

For example, a user _has many_ posts,
so we use the following directories:

```
/users/*/posts/*
```

And a user _has one_ config,
so we might use the following directories:

```
/users/*/config
```

Or we might just let `config` be
a property of the JSON that represent a user.

When designing API or syntax,
we often should optimize for the most used use case,
thus using file system as database can be viewed as
optimizing for `has one` and `has many` relations.

The `many to many` relation can still be implemented by indexes,
just like normal relational database.

Since we optimized the tool for the most use case,
the tool feels so handy and easy to understand.

So, what if we use file system as database?

It feels like an idea worth trying.

Now, let us explore how execatly can we implement this idea.
