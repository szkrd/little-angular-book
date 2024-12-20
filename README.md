# Little Angular Book

Helpful notes for taming the kraken called Angular.

Available at: https://szkrd.github.io/little-angular-book/

## Book deprecation warning

Initially I wrote these notes for Angular 5 in 2018 Q1, they may or may not be totally
outdated. The book is updated from time to time, usually on a whim, when I have the
time and feel like doing so.

## Toolchain deprecation warning

Originally created for GitBook, but since they moved towards a saas business model,
this repo has been archived, unarchived, and now has a custom static builder.

Scripts:

1. `npm install`
2. `npm run build` = converts all the markdowns in the _book_ directory, output is _docs_
3. `npm run dev` = listens and rebuilds everything on change, serves it at http://localhost:5000
4. `npm run format` = uses [prettier](https://prettier.io/) to reformat the code in _src_
