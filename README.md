# FiDB

[ [Webwite](https://fidb.app)
| [Manual](https://readonly.link/manuals/https://code-of-fidb.fidb.app/docs/manual.json)
| [Manual (book form)](https://readonly.link/books/https://code-of-fidb.fidb.app/docs/book.json) ]

File system as database.

## Install

### Requirements

Node.js version must be >= [20.1](https://nodejs.org/en/blog/release/v20.1.0) or >= [18.17.0](https://nodejs.org/en/blog/release/v18.17.0).

- For the `recursive` option to `readdir` and `opendir`.

### Command line tool

Install it by the following command:

```sh
npm install -g fidb
```

The command line program is called `fidb`.

```sh
fidb help             # Print help message
fidb serve <path>     # Serve a database
```

## Docs

- [Use systemd to start service](#use-systemd-to-start-service)

### Use systemd to start service

Install service:

```
sudo cp <name>.service /etc/systemd/system/
```

Using service:

```
sudo systemctl start <name>.service
sudo systemctl enable <name>.service
sudo systemctl status <name>.service
```

To view log:

```
journalctl -f -u <name>.service
```

Reload systemd config files:

```
systemctl daemon-reload
```

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
