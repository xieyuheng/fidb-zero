# FiDB

[ [Webwite](https://fidb.app)
| [Manual](https://readonly.link/manuals/https://code-of-fidb.fidb.app/docs/manual.json)
| [Manual (book form)](https://readonly.link/books/https://code-of-fidb.fidb.app/docs/book.json)
| [TSDoc](https://code-of-fidb.fidb.app/tsdoc/index.html) ]

File system as database.

## Usages

### Requirements

Node.js version must be >= [20.1](https://nodejs.org/en/blog/release/v20.1.0) or >= [18.17.0](https://nodejs.org/en/blog/release/v18.17.0).

- For the `recursive` option to `readdir` and `opendir`.

We do not write the `engines` limitation in `package.json`,
so that we can `npm run build:tsdoc` on vercel.

### Command line tool

Install it by the following command:

```sh
npm install -g fidb
```

The command line program is called `fidb`.

```sh
fidb help                # Print help message
fidb serve <path>        # Serve a database
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
