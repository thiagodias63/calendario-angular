import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, map, of, tap } from 'rxjs';

interface Week {
  days: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  firstDayOfCurrentMonth = -1;
  lastDayOfCurrentMonth = -1;
  daysInCurrentMonth = -1;
  weeks: Week[] = [];
  currentInterator = -1;
  currentMonthName = '';
  prevMonthName = '';
  nextMonthName = '';
  birthDays$: Observable<any> | null = null;

  constructor(private _http: HttpClient) {
    // this.createAsyncCallToBirthDays();
    this.craeteMockedCallToBirthdays();
    this.getMonthFacade();
  }

  craeteMockedCallToBirthdays(): void {
    this.birthDays$ = of([
      { name: 'Alden', year: 1974, month: 7, day: 24 },
      { name: 'Debbra', year: 1988, month: 8, day: 27 },
      { name: 'Kirk', year: 2002, month: 11, day: 26 },
      { name: 'Eric', year: 1994, month: 8, day: 26 },
      { name: 'Hiroko', year: 1983, month: 1, day: 11 },
      { name: 'Clinton', year: 1992, month: 2, day: 19 },
      { name: 'Maddie', year: 1961, month: 4, day: 20 },
      { name: 'Cherelle', year: 1964, month: 5, day: 18 },
      { name: 'Omar', year: 2004, month: 2, day: 3 },
      { name: 'Lupe', year: 1991, month: 10, day: 28 },
      { name: 'Jeremiah', year: 1992, month: 7, day: 29 },
      { name: 'Elmer', year: 1978, month: 12, day: 9 },
      { name: 'Jeannine', year: 1998, month: 2, day: 25 },
      { name: 'Evelia', year: 1989, month: 12, day: 16 },
      { name: 'Crissy', year: 1989, month: 10, day: 6 },
      { name: 'Blair', year: 1973, month: 11, day: 16 },
      { name: 'Darrin', year: 1989, month: 3, day: 20 },
      { name: 'Ava', year: 1977, month: 8, day: 7 },
      { name: 'Melvin', year: 1998, month: 5, day: 8 },
      { name: 'Barry', year: 1973, month: 11, day: 15 },
      { name: 'Kory', year: 1983, month: 4, day: 16 },
      { name: 'Mirta', year: 1982, month: 7, day: 19 },
      { name: 'Kourtney', year: 1991, month: 4, day: 16 },
      { name: 'Ronnie', year: 1978, month: 5, day: 11 },
      { name: 'Ming', year: 1959, month: 8, day: 7 },
      { name: 'Ardella', year: 1997, month: 4, day: 23 },
      { name: 'Etta', year: 1987, month: 10, day: 7 },
      { name: 'Arianne', year: 1964, month: 8, day: 21 },
      { name: 'Danelle', year: 1982, month: 10, day: 2 },
      { name: 'Colton', year: 1963, month: 1, day: 28 }
    ])
  }

  // createAsyncCallToBirthDays():void {
  // this.birthDays$ = this._http.get<any[]>('https://random-data-api.com/api/v2/users?size=30').pipe(map((response: any[]) => {
  //   return response.map((r: any) => {
  //     const year: number = Number(r.date_of_birth.slice(0, 4))
  //     const month: number = Number(r.date_of_birth.slice(5, 7))
  //     const day: number = Number(r.date_of_birth.slice(8))
  //     return { name: r.first_name, year, month, day }
  //   })
  // }), tap((birthDays) => {
  //   console.log(birthDays)
  // }))
  // }

  getMonthFacade(): void {
    this.weeks = [];
    this.getMonthsNames();
    this.getFirstDayOfCurrentMonth();
    this.getLastDayOfCurrentMonth();
  }

  getMonthsNames(): void {
    this.currentMonthName = dayjs().set('month', this.currentMonth).set('year', this.currentYear).format('MMMM');
    this.prevMonthName = dayjs().set('month', this.currentMonth - 1).set('year', this.currentYear).format('MMMM');
    this.nextMonthName = dayjs().set('month', this.currentMonth + 1).set('year', this.currentYear).format('MMMM');
  }

  getDaysInMonth(month: number, year: number): number {
    return dayjs().set('month', month).set('year', year).daysInMonth() - 1;
  }

  getFirstDayOfCurrentMonth(): void {
    this.firstDayOfCurrentMonth = dayjs().set('D', 1).set('month', this.currentMonth).set('year', this.currentYear).day();

    if (this.firstDayOfCurrentMonth > 0) {
      // get last day of the last month
      let lastDayOfLastMonth: number | string = dayjs().set('D', this.getDaysInMonth(this.currentMonth - 1, this.currentYear)).set('month', this.currentMonth - 1).set('year', this.currentYear).format('DD');
      lastDayOfLastMonth = Number(lastDayOfLastMonth) + 1

      const days: number[] = [];
      // then remove 1 by 1 until this.firstDayOfCurrentMonth = 0
      for (let copyFirstDayOfCurrentMonth = this.firstDayOfCurrentMonth; copyFirstDayOfCurrentMonth > 0; (copyFirstDayOfCurrentMonth--, lastDayOfLastMonth--)) {
        days.unshift(lastDayOfLastMonth)
      }
      // then add the days of current month
      for (let copyFirstDayOfCurrentMonth = this.firstDayOfCurrentMonth, i = 1; copyFirstDayOfCurrentMonth <= 6; copyFirstDayOfCurrentMonth++, i++) {
        days.push(i)
      }
      this.weeks.push({ days })
    } else {
      // just set the first week
      const days: number[] = [];
      for (let i = 1; i <= 7; i++) {
        days.push(i)
      }
      this.weeks.push({ days })
    }
  }

  getLastDayOfCurrentMonth() {
    this.daysInCurrentMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    this.lastDayOfCurrentMonth = dayjs().set('day', this.daysInCurrentMonth).set('month', this.currentMonth).set('year', this.currentYear).day();
    this.getMiddleWeeksOfMonth();
    if (this.lastDayOfCurrentMonth < 6) {
      const days: number[] = [];
      // start a week of the last days of month
      for (let i = this.lastDayOfCurrentMonth; i >= 0; i--) {
        days.push(this.daysInCurrentMonth - i + 1);
      }
      // get last day of the current month
      // then add 1 by 1 until this.lastDayOfCurrentMonth - 6  = 0
      for (let copyDaysInCurrentMonth = this.lastDayOfCurrentMonth, i = 1; copyDaysInCurrentMonth < 6; (copyDaysInCurrentMonth++, i++)) {
        days.push(i);
      }
      this.weeks.push({ days });
    }
  }

  getMiddleWeeksOfMonth(): void {
    let limit = this.lastDayOfCurrentMonth < 6 ? this.daysInCurrentMonth - this.lastDayOfCurrentMonth % 6 + 1 : this.daysInCurrentMonth + 1;
    let startPoint = this.firstDayOfCurrentMonth % 6 + 1
    let weeks = (limit - startPoint) / 7
    this.currentInterator = 7 - this.firstDayOfCurrentMonth + 1;
    // at least three weeks in between the initial day and last day
    if (weeks < 3) weeks = weeks + 1;
    while (weeks > 1) {
      weeks = weeks - 1;
      this.weeks.push({ days: this.addDaysInMiddleOfMonth() });
    }

    if ((this.daysInCurrentMonth + 1) % this.weeks[this.weeks.length - 1].days[6] >= 7) {
      this.weeks.push({ days: this.addDaysInMiddleOfMonth() });
    }
  }

  addDaysInMiddleOfMonth(): number[] {
    const days: number[] = [];
    for (let currentIndex = 0; currentIndex < 7; currentIndex++, this.currentInterator++) {
      days.push(this.currentInterator)
    }
    return days;
  }

  changeMonth(operator: number): void {
    this.currentMonth = this.currentMonth + operator;
    if (this.currentMonth === -1) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    }
    if (this.currentMonth === 12) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    }
    this.getMonthFacade();
  }
}
