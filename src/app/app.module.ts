import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BirthdayCounterOfTheDayComponent } from './birthday-counter-of-the-day/birthday-counter-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    BirthdayCounterOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
