---
title: Indexing
---

First let's have some design constraints:

- FiDB must work fine without any indexes, all indexes must be optional.
- We must be able to create and delete indexes at any time,
  without stopping the FiDB server.

TODO
