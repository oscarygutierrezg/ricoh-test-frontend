import { Pipe, PipeTransform } from '@angular/core';
import { Laureate } from '../model/laureate';

@Pipe({
  name: 'laureateNames'
})
export class LaureateNamesPipe implements PipeTransform {

  transform(value: Laureate[], ...args: unknown[]): string {
    let names = '';
    value.forEach( f => {
      if(f.knownName != null)
        names = names.concat(`${f.knownName?.en}, `);
      else
        names = names.concat(`-, `);
    });
    return  names.slice(0, -2);
  }

}