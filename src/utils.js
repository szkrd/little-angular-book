const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const http = require('http');

const express = require('express');
const emojiLib = require('emojilib');
const hljs = require('highlight.js');
const { Marked } = require('marked');
const { markedEmoji } = require('marked-emoji');
const { markedHighlight } = require('marked-highlight');

const fsReadDir = promisify(fs.readdir);
const fsStat = promisify(fs.stat);
const fsMkdir = promisify(fs.mkdir);
const fsRm = promisify(fs.rm);
let marked = null; // instence of Marked

function escapeRex(s = '') {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/** Plain chdir wrapper, can join path fragments, can replace `<vars>`. */
function cd(...args) {
  const pathNames = Array.from(args).map((text) => text.replaceAll('<script>', path.dirname(process.argv[1])));
  process.chdir(path.join(...pathNames));
}

/** Promisified mkdir. Always recursive. */
function md(dirName = '') {
  return fsMkdir(dirName, { recursive: true });
}

/** Promisified rm (works on dirs and files). */
function rm(name = '') {
  return fsRm(name, { recursive: true, force: true });
}

/**
 * By default emoji-lib uses the emoji as key and the texts (like `:smile:`) as an array,
 * but we prefer it the other way around (`{':smile:': 😊}`).
 */
function getEmojis() {
  return Object.keys(emojiLib).reduce((acc, key) => {
    const name = emojiLib[key][0].replaceAll(' ', '-'); // let's use the first name, that's the most relevant one
    acc[name] = key;
    return acc;
  }, {});
}

/** Moves an element inside an array to the very first position. */
function moveItemToArrayBeginning(s, arr) {
  if (arr && arr.length > 1 && arr.includes(s)) {
    arr = [s].concat(arr.filter((x) => x !== s));
  }
  return arr;
}

/**
 * Recursively walks a directory and its subdirectories, returning
 * a lsit of (relative) file paths. The file `README.md` will always
 * be the first item in a directory, the rest are sorted as is.
 */
async function walkDir(dir, fileList = []) {
  let files = await fsReadDir(dir);
  files = moveItemToArrayBeginning('README.md', files.sort());
  for (const file of files) {
    const stat = await fsStat(path.join(dir, file));
    if (stat.isDirectory()) fileList = await walkDir(path.join(dir, file), fileList);
    else fileList.push(path.join(dir, file));
  }
  return fileList;
}

/**
 * Converts plain text markdown to HTML using the _marked_ library.
 *
 * Returns a promise!
 */
function convertMarkdownToHtml(text = '') {
  if (!marked) {
    marked = new Marked(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight: (code, language) => hljs.highlight(code, { language: language || 'plaintext' }).value, // language can be an empty string, not nil!
      }),
    );
    marked.use(markedEmoji({ emojis: getEmojis(), renderer: (token) => token.emoji }));
    isMarkedSetup = true;
  }
  return marked.parse(text);
}

/**
 * Uses `serve` to launch a basic static html server.
 *
 * I'm doing this, because running serve AND a builder concurrently
 * resulted in file locking errors (serve locking files) on Windows.
 */
function launchHttpServer(port = 5000, host = 'localhost') {
  // const server = http.createServer((request, response) => serveHandler(request, response, { public: 'docs' }));
  const app = express();
  app.use(express.static('docs'));
  app.listen(port, host, () => {
    console.log(`Running at http://${host}:${port}`);
  });
}

module.exports = { escapeRex, md, cd, rm, walkDir, convertMarkdownToHtml, launchHttpServer };
