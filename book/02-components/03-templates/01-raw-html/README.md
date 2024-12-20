# Raw HTML

```
<div [innerHTML]="message"></div>
```

:exclamation_mark: This will still go through a sanitizer, so inline styles, scripts and urls are going to be stripped out (the sanitizer pipe solution below is by [Günter Zöchbauer](https://stackoverflow.com/a/37076868)).

Possible sanitizers: style, html, script, url, resource url.

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtml implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(val) {
    return this.sanitizer.bypassSecurityTrustHtml(val);
  }
}
```
- `text = '<em style="color:red">unsafe text</em>'`
- usage: `<div [innerHTML]="text | safeHtml"></div>`

Without the pipe the text would be black.


