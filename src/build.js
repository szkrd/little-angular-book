const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const ejs = require('ejs');
const packageJson = require('../package.json');
const { escapeRex, convertMarkdownToHtml, md, cd, rm, walkDir, launchHttpServer } = require('./utils');
const args = process.argv.splice(2);

const fsCopyFile = promisify(fs.copyFile);
const fsMkDir = promisify(fs.mkdir);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

// ----------------------------------------------------------------------------

async function main() {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(
      'Converts markdown files in "book", saves output to "docs".\nOptions:\n--no-flush = do not delete the docs directory\n' +
        '--silent = less verbose\n--serve = serves result on localhost:5000',
    );
    process.exit(0);
  }

  // change to script's parent dir (which should be the project's root)
  cd('<script>', '..');

  const { version } = packageJson;
  const list = await walkDir('./book');

  // delete the docs dir first
  if (!args.includes('--no-flush')) {
    await rm('docs');
    await md('docs');
  }

  // build common menu
  let menuItems = list
    .filter((s) => s.endsWith('.md'))
    .map((s) => {
      const original = s;
      const lines = fs.readFileSync(s, 'utf-8').split('\n');
      let title = (lines.find((line) => line.startsWith('# ')) ?? '').replace(/^# /, '') || s[s.length - 2] || 'TOC';
      const sections = (lines.filter((line) => line.startsWith('## ')) || []).map((l) => l.replace(/^## /, ''));
      title = title.replace(/^# /, '');
      s = s.split(path.sep).slice(1);
      if (!args.includes('--silent')) {
        console.info(`Processing ${s} (d:${s.length})`);
      }
      return {
        original,
        selected: false,
        depth: s.length,
        title: title.replace(/^#\s+/, '').replace(/:([a-z-_]*):/g, ''), // also remove text emojis
        sections,
        url:
          './' +
          s
            .join('/')
            .replace(/README\.md$/, 'index.html')
            .replace(/\.md$/, '.html'),
      };
    });

  // iterate through files
  let processedCount = 0;
  for (let i = 0; i < list.length; i++) {
    const source = list[i];
    const baseName = path.basename(source);
    const extName = path.extname(baseName).replace(/^\./, '');

    // create target directories (book -> docs)
    let target = source.replace(/^book/, 'docs');
    const depth = target.split(path.sep).length - 1;
    const relativeRoot = new Array(depth).join('../');
    const targetPathOnly = target.replace(new RegExp(escapeRex(baseName) + '$'), '');
    await fsMkDir(targetPathOnly, { recursive: true });

    // mark selected item in menu, fix relative paths
    const localMenuItems = menuItems.map((item) => ({
      ...item,
      selected: item.original === source,
      url: (relativeRoot + item.url).replace('/./', '/'),
    }));

    // prep the ejs renderer, fix paths
    let ejsSource = await fsReadFile('./overlay/index.ejs', 'utf-8');
    const ejsTemplate = ejs.compile(ejsSource, {
      fileName: 'index.ejs',
    });

    // convert md files to html
    if (baseName.endsWith('.md')) {
      target = target.replace(/\.md$/, '.html');
      if (baseName === 'README.md') {
        target = target.replace(/README\.html$/, 'index.html');
      }
      const contents = await fsReadFile(source, 'utf-8');

      let md = await convertMarkdownToHtml(contents);
      md = md.replace(/<pre>/g, '<pre class="hljs">'); // such custom renderer, very lazy
      let headings = 1;
      md = md.replace(/<h2[^>]*>/g, (sub) => `<h2><a name="${headings++}">`); // h2 start
      md = md.replace(/<\/h2>/g, '</a></h2>'); // h2 start
      md = md.replace(/README\.md">/g, 'index.html">'); // README to index.html
      md = md.replace(/\.md">/g, '.html">'); // all md to html
      // fix relative roots in links
      const relPath = targetPathOnly
        .split(/[/\\]/) // slash vs backslash in path
        .slice(1)
        .slice(0, depth - 1);
      md = md.replace(/\shref="([^"]*)"/g, (all, matcher) => {
        if (/^(http|https|ftp|\/|:\/\/)/.test(matcher)) return all; // skip external or absolute
        const pathMod = (relativeRoot + relPath.join('/') + '/' + matcher).replace(/^\//, '');
        return ` href="${pathMod}"`;
      });

      processedCount++;
      await fsWriteFile(
        target,
        ejsTemplate({
          md,
          v: version,
          root: relativeRoot,
          menuItems: localMenuItems,
        }),
      );
    }

    // copy binaries
    const copyOperation = [];
    if (['png', 'jpg'].includes(extName)) {
      copyOperation.push(fsCopyFile(source, target));
    }
    await Promise.all(copyOperation);
  }
  console.log(`Processed ${processedCount} files.`);

  // copy overlay files
  const hljsTheme = 'atom-one-dark'; // 'github-gist', darcula is gone
  await Promise.all([
    fsCopyFile('./overlay/main.js', './docs/main.js'),
    fsCopyFile('./overlay/normalize.css', './docs/normalize.css'),
    fsCopyFile('./overlay/main.css', './docs/main.css'),
    fsCopyFile('./overlay/markdown.css', './docs/markdown.css'),
    fsCopyFile(`./node_modules/highlight.js/styles/${hljsTheme}.min.css`, './docs/hljs-theme.css'),
  ]);

  if (args.includes('--serve')) {
    launchHttpServer(5000);
  }
}

// ----------------------------------------------------------------------------

main().catch((error) => {
  console.error(error);
});
