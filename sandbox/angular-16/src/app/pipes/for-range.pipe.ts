import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'forRange' })
export class ForRangePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): Iterable<number> {
    return new Array(parseInt(String(value ?? 0), 10)).fill('').map((val, idx) => idx);
  }
}
