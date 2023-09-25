import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import * as dayjs from 'dayjs';

interface Week {
  days: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar';
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

  constructor() {
    this.getMonthFacade();
  }

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
