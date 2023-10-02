import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Calendar } from 'core/calendar';
import { Observable, of } from 'rxjs';

interface Week {
  days: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calendar = new Calendar();
  birthDays$: Observable<any> | null = null;

  constructor(private _http: HttpClient) {
    // this.createAsyncCallToBirthDays();
    this.craeteMockedCallToBirthdays();
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

  changeMonth(operator: number): void {
    this.calendar = this.calendar.changeMonth(operator);
  }
}
