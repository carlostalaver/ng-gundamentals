import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    console.log('llamando al pipe, ', args);

    switch (value) {
      case 1:
        return 'Half Hour';
      case 2:
        return 'One Hour';
      case 3:
        return 'Half day';
      case 4:
        return 'Full day';
      default:
        return value.toString();
    }
  }

}