import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BirthdayCounterOfTheDayComponent } from './birthday-counter-of-the-day/birthday-counter-of-the-day.component';
import { DayPipe } from './pipes/day.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BirthdayCounterOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DayPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
