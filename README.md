# Little Angular Book

Helpful notes for taming the kraken called Angular.

Available at: https://szkrd.github.io/little-angular-book/

## Book deprecation warning

I wrote these notes for Angular 5 in 2018 Q1, they may or may not be totally
outdated. I don't know - if I have to work with Angular again, I might
update this book. Or might not.

## Toolchain deprecation warning

Originally created for GitBook, but since they moved towards a saas business model,
this repo has been archived, unarchived, and now has a custom static builder.

Do `npm install`, `npm run build`, `npm serve`. Joy, happiness.

## Development

- this is a custom builder, please check the [package.json](./package.json) for run scripts
- angular versions may be found in _./sandbox_, please use WebStorm in there
- `serve` has been replaced with `express` (with express.static) because of file locking issues
  (serve locked the files in docs file the watcher tried to rewrite them)
- _sandbox_ is search ignored in vscode
- _docs_ (the output) is file ignored in vscode
