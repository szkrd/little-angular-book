const shelljs = require('shelljs')
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const hljs = require('highlight.js')
const marked = promisify(require('marked'))
const emoji = require('emojilib')
const ejs = require('ejs')
const packageJson = require('../package.json')
const args = process.argv.splice(2)

const fsCopyFile = promisify(fs.copyFile)
const fsReadDir = promisify(fs.readdir)
const fsStat = promisify(fs.stat)
const fsMkDir = promisify(fs.mkdir)
const fsWriteFile = promisify(fs.writeFile)

// replace :emoji: markers with proper emoji (gitbook had a plugin for this)
const customRenderer = (() => {
  const emojiKeywords = Object.keys(emoji.lib).reduce((acc, key) => {
    const chr = acc[key] = emoji.lib[key].char;
    (emoji.lib[key].keywords || []).forEach(kw => acc[kw] = chr)
    return acc
  }, {})
  const origRenderer = marked.Renderer
  const customRenderer = {}
  const addHook = (method) => {
    customRenderer[method] = function (text) {
      if (text.includes(':') && text.match(/:/g).length > 1) {
        text = text.replace(/:([a-z-_]*):/g, (s, m) => (emoji.lib[m] || {}).char || emojiKeywords[m] || s)
      }
      return origRenderer.prototype[method].apply(this, arguments)
    }
  }
  ['codespan', 'del', 'em', 'heading', 'listitem', 'paragraph', 'strong', 'text'].forEach(addHook)
  return customRenderer
})()
marked.setOptions({
  highlight: function (code, lang) {
    lang = lang || 'text'
    return lang === 'text' ? code : hljs.highlight(lang, code).value
  }
})
marked.use({ renderer: customRenderer })

function escapeRex (s = '') {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function moveItemToArrayBeginning (s, arr) {
  if (arr && arr.length > 1 && arr.includes(s)) {
    arr = [s].concat(arr.filter(x => x !== s))
  }
  return arr
}

async function walkDir (dir, fileList = []) {
  let files = await fsReadDir(dir)
  files = moveItemToArrayBeginning('README.md', files.sort())
  for (const file of files) {
    const stat = await fsStat(path.join(dir, file))
    if (stat.isDirectory()) fileList = await walkDir(path.join(dir, file), fileList)
    else fileList.push(path.join(dir, file))
  }
  return fileList
}

// ---------------------------------------------------------------------------------------------------------------------

async function main () {
  // change to script's parent dir (which should be the project's root)
  shelljs.cd(path.join(path.dirname(process.argv[1]), '/..'))

  const { version } = packageJson
  const list = await walkDir('./book')

  // delete the docs dir first
  if (!args.includes('no-flush')) {
    shelljs.rm('-rf', 'docs')
    shelljs.mkdir('docs')
  }

  // build common menu
  let menuItems = list
    .filter(s => s.endsWith('.md'))
    .map(s => {
      const original = s
      const lines = (fs.readFileSync(s, 'utf-8')).split('\n')
      let title = lines.find(line => line.startsWith('# ')).replace(/^# /, '') || s[s.length - 2] || 'TOC'
      const sections = (lines.filter(line => line.startsWith('## ')) || []).map(l => l.replace(/^## /, ''))
      title = title.replace(/^# /, '')
      s = s.split(path.sep).slice(1)
      console.info(`Processing ${s} (d:${s.length})`)
      return {
        original,
        selected: false,
        depth: s.length,
        title: title.replace(/^#\s+/, ''),
        sections,
        url: './' + s.join('/').replace(/README\.md$/, 'index.html').replace(/\.md$/, '.html')
      }
    })

  // iterate through files
  for (let i = 0; i < list.length; i++) {
    const source = list[i]
    const baseName = path.basename(source)
    const extName = path.extname(baseName).replace(/^\./, '')

    // create target directories (book -> docs)
    let target = source.replace(/^book/, 'docs')
    const depth = target.split(path.sep).length - 1
    const relativeRoot = new Array(depth).join('../')
    const targetPathOnly = target.replace(new RegExp(escapeRex(baseName) + '$'), '')
    await fsMkDir(targetPathOnly, { recursive: true })

    // mark selected item in menu, fix relative paths
    const localMenuItems = menuItems.map(item => ({
      ...item,
      selected: item.original === source,
      url: (relativeRoot + item.url).replace('/./', '/')
    }))

    // prep the ejs renderer, fix paths
    let ejsSource = fs.readFileSync('./overlay/index.ejs', 'utf-8')
    const ejsTemplate = ejs.compile(ejsSource, {
      fileName: 'index.ejs'
    })

    // convert md files to html
    if (baseName.endsWith('.md')) {
      target = target.replace(/\.md$/, '.html')
      if (baseName === 'README.md') {
        target = target.replace(/README\.html$/, 'index.html')
      }
      const contents = fs.readFileSync(source, 'utf-8')
      let md = await marked(contents)
      md = md.replace(/<pre>/g, '<pre class="hljs">') // such custom renderer, very lazy
      let headings = 1
      md = md.replace(/<h2[^>]*>/g, (sub) => `<h2><a name="${headings++}">`) // h2 start
      md = md.replace(/<\/h2>/g, '</a></h2>') // h2 start
      md = md.replace(/README\.md">/g, 'index.html">')
      md = md.replace(/\.md">/g, '.html">')
      await fsWriteFile(target, ejsTemplate({
        md,
        v: version,
        root: relativeRoot,
        menuItems: localMenuItems
      }))
    }

    // copy binaries
    const copyOperation = []
    if (['png', 'jpg'].includes(extName)) {
      copyOperation.push(fsCopyFile(source, target))
    }
    await Promise.all(copyOperation)
  }

  // copy overlay files
  const hljsTheme = 'darcula' // 'github-gist'
  await Promise.all([
    fsCopyFile('./overlay/normalize.css', './docs/normalize.css'),
    fsCopyFile('./overlay/main.css', './docs/main.css'),
    fsCopyFile('./overlay/markdown.css', './docs/markdown.css'),
    fsCopyFile(`./node_modules/highlight.js/styles/${hljsTheme}.css`, './docs/hljs-theme.css')
  ])
}

main().catch((error) => {
  console.error(error)
})
