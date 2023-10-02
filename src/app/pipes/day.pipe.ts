import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'dayPipe',
  pure: true,
  standalone: true
})
export class DayPipe implements PipeTransform {
  transform(day: number): number | string {
    if (day > 9) return day;
    else return '0' + day;
  }
}
