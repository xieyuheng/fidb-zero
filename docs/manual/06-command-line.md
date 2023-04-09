---
title: Command-line
---

An implementation of FiDB server can be used as a command-line tool.

I must say something about how I envisioned this project when I started it.
I want to use a directory of subdirectories and files as a database,
be able to edit data by hand in text editor,
and whenever I wish, **spin** a HTTP server
with all the APIs discussed in this manual by one command:

```
fidb serve <database>
```

<img style="max-width: 500px; width: 100%;" src="https://image-link.xieyuheng.com/spin/Snurra_uppochner.gif" />

My implementation of FiDB is at [github.com/fidb-official/fidb](https://github.com/fidb-official/fidb).

You can add new kinds of APIs by adding new `kind=...` parameters,
using new data files to configure your API,
and again, spin it with one command.

There might also be other implementations of FiDB,
this manual serves as a suite of protocols
to keep implementations interoperable.
