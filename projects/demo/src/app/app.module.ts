import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieConsentModule } from '@notiz/cookie-monster';

import { AppComponent } from './app.component';
import { cookieConfig } from './cookie.config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CookieConsentModule.forRoot(cookieConfig)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
