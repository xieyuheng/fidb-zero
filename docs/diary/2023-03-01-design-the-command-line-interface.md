---
title: Design the command line interface
author: Xie Yuheng
date: 2023-03-01
---

```
fidb serve-database <directory> --port 5108 \
  --reverse-proxy-server https://fidb.app:5108 \
  --reverse-proxy-subdomain pomodoro \
  --reverse-proxy-username xieyuheng \
  --reverse-proxy-password abc

database served at:

  http://localhost:5108
  https://pomodoro.fidb.app:5108

fidb login-reverse-proxy-server https://fidb.app:5108

fidb serve-database <directory> --port 5108 --reverse-proxy https://pomodoro.fidb.app:5108

database served at:

  http://localhost:5108
  https://pomodoro.fidb.app:5108

fidb serve-website <directory> --port 8080 \
  --reverse-proxy-server https://fidb.app \
  --reverse-proxy-subdomain pomodoro \
  --reverse-proxy-username xieyuheng \
  --reverse-proxy-password abc

website served at:

  http://localhost:8080
  https://pomodoro.fidb.app

fidb serve-reverse-proxy <directory> --port 5108 \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem

reverse-proxy served at:

  https://127.0.0.1:5108

fidb serve-reverse-proxy <directory> --port 443 \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem

reverse-proxy served at:

  https://127.0.0.1
```
