---
title: Reverse proxy use case
---

We can not yet run tests for command-line.

```
fidb serve-reverse-proxy --port 8080 --port 5108 \
 --database ~/fidb-official/fidb-databases/databases/reverse-proxy \
 --domain cicada.localhost


fidb login-reverse-proxy http://cicada.localhost:8080/users/xieyuheng

# NOTE Login one port will login all ports,
#   so we do not need to do the following:
#
# fidb login-reverse-proxy http://cicada.localhost:5108/users/xieyuheng


fidb serve-website ~/learn-x/learn-alpinejs/notepad \
  --url http://notepad.cicada.localhost:8080

curl 'http://notepad.cicada.localhost:8080'


fidb serve-database ~/fidb-official/fidb-databases/databases/test \
  --url http://notepad.cicada.localhost:5108

curl 'http://notepad.cicada.localhost:5108?kind=info'
```
