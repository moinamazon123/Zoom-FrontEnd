import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datesuffix'
})
export class DatesuffixPipe implements PipeTransform {

    transform(value: string): string {

        let suffix = 'th',
            day = value;

        if (day === '01' || day === '21' || day === '31') {
            suffix = 'st'
        } else if (day === '02' || day === '22') {
            suffix = 'nd';
        } else if (day === '03' || day === '23') {
            suffix = 'rd';
        }

        return suffix;

    }
}
