import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args: string[]): any {
    let keys = [];

    for (const key in value) {
      if (isNaN(Number(key))) {
        keys.push({key: key, value: value[key]})
      }
    }

    return keys;
  }

}
